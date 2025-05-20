// src/services/amplifyAuthService.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signOut,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes
} from 'aws-amplify/auth';
import {
  cognitoSignIn,
  cognitoSignUp,
  cognitoConfirmSignUp,
  cognitoResendConfirmationCode,
  cognitoForgotPassword,
  cognitoConfirmForgotPassword
} from '../utils/cognitoAuth';
import { decodeJWT } from '../utils/jwtDecode';
import { padIdentifierForCognito, extractOriginalIdentifier } from '../utils/authUtils';
import { getCognitoConfig, logCognitoConfig } from '../utils/envUtils';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ idNumber, password, documentType }, { rejectWithValue }) => {
    try {
      // First, check if there's already a signed-in user
      try {
        // Try to sign out any existing user first
        await signOut();
        console.log('Signed out existing user');
      } catch (signOutError) {
        // Ignore errors from signOut - it might just mean no user was signed in
        console.log('No existing user to sign out or sign out failed:', signOutError);
      }

      // Get Cognito configuration from environment variables
      const cognitoConfig = getCognitoConfig();

      // Log configuration for debugging
      logCognitoConfig('Login', cognitoConfig);

      // TEMPORARY WORKAROUND: Handle padded passport numbers for login
      // Determine if we need to pad the identifier (for passport numbers)
      // If documentType is not provided, try to detect from the format
      const detectedDocType = documentType ||
                             (idNumber.length < 13 ? 'passport' : 'idNumber');

      const paddedIdentifier = padIdentifierForCognito(idNumber, detectedDocType);

      console.log(`Login - Document type: ${detectedDocType}, Original: ${idNumber}, Padded: ${paddedIdentifier}`);

      // Now attempt to sign in using our custom function
      const signInResponse = await cognitoSignIn(
        paddedIdentifier, // Using padded identifier as username
        password,
        cognitoConfig.userPoolWebClientId,
        cognitoConfig.clientSecret,
        cognitoConfig.region
      );

      console.log('Sign in response:', signInResponse);

      // Extract tokens from the response
      const idToken = signInResponse.AuthenticationResult.IdToken;
      const accessToken = signInResponse.AuthenticationResult.AccessToken;
      const refreshToken = signInResponse.AuthenticationResult.RefreshToken;

      // Store tokens in localStorage
      localStorage.setItem('auth_id_token', idToken);
      localStorage.setItem('auth_access_token', accessToken);
      localStorage.setItem('auth_refresh_token', refreshToken);

      // Decode the ID token to get user attributes
      const decodedToken = decodeJWT(idToken);
      console.log('Decoded ID token:', decodedToken);

      // Create user object with info from the token
      const user = {
        idNumber: idNumber,
        email: decodedToken?.email || '',
        name: decodedToken?.name || '',  // Extract name from token
      };

      console.log('User object created:', user);

      // Store user in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(user));

      return {
        user: user,
        token: idToken
      };
    } catch (error) {
      console.error('Login error:', error);
      // Handle specific error cases
      if (error.message && error.message.includes('UserNotConfirmedException')) {
        return rejectWithValue('User is not confirmed. Please check your email for verification code.');
      } else if (error.message && error.message.includes('NotAuthorizedException')) {
        return rejectWithValue('Incorrect ID Number or password.');
      } else if (error.message && error.message.includes('UserNotFoundException')) {
        return rejectWithValue('User does not exist.');
      } else if (error.message && error.message.includes('UserAlreadyAuthenticatedException')) {
        // Handle the case where a user is already authenticated
        try {
          // Try to get the current session
          await getCurrentUser(); // Verify user is authenticated
          const { tokens } = await fetchAuthSession();

          // Try to decode the ID token to get user attributes
          const idToken = tokens.idToken.toString();
          const decodedToken = decodeJWT(idToken);
          console.log('Decoded ID token from existing session:', decodedToken);

          // Create user object with info from the token
          const user = {
            idNumber: idNumber, // We don't know if this is correct, but it's what the user entered
            email: decodedToken?.email || '',
            name: decodedToken?.name || '',  // Extract name from token
          };

          // Store user in localStorage
          localStorage.setItem('auth_user', JSON.stringify(user));

          return {
            user: user,
            token: tokens.idToken.toString()
          };
        } catch (innerError) {
          console.log('Error getting current user session:', innerError);
          // If we can't get the current user, force sign out and ask to try again
          try {
            await signOut({ global: true });
          } catch (signOutError) {
            console.log('Error during forced sign out:', signOutError);
            // Continue with the flow even if sign out fails
          }
          return rejectWithValue('Session conflict detected. Please try logging in again.');
        }
      }
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Get Cognito configuration from environment variables
      const cognitoConfig = getCognitoConfig();

      // Log configuration for debugging
      logCognitoConfig('Registration', cognitoConfig);

      // TEMPORARY WORKAROUND: Pad passport numbers to meet the 13-character minimum length requirement
      // This will be removed when Cognito is properly configured for passport numbers
      const documentType = userData.documentType || 'idNumber';
      const paddedIdentifier = padIdentifierForCognito(userData.idNumber, documentType);

      console.log(`Document type: ${documentType}, Original identifier: ${userData.idNumber}, Padded: ${paddedIdentifier}`);

      // Prepare user attributes
      const userAttributes = {
        email: userData.email,
        name: userData.name,
        'custom:idNumber': paddedIdentifier,
        // Store the document type for future reference
        'custom:documentType': documentType
        // Note: We're not storing 'custom:originalIdentifier' as it's not configured in Cognito
      };

      // Using our custom sign up function with Identity Pool ID
      const signUpResponse = await cognitoSignUp(
        paddedIdentifier, // Using padded identifier as username
        userData.password,
        userAttributes,
        cognitoConfig.userPoolWebClientId,
        cognitoConfig.clientSecret,
        cognitoConfig.region,
        cognitoConfig.identityPoolId // Pass the Identity Pool ID
      );

      console.log('Registration successful with Identity Pool integration:', signUpResponse);

      // Store the original identifier for verification (not the padded one)
      return {
        success: true,
        message: 'Registration successful. Please check your email for verification.',
        identityPoolAssociation: signUpResponse.identityPoolAssociation,
        originalIdentifier: userData.idNumber
      };
    } catch (error) {
      console.error('Registration error:', error);

      // Try to parse the error message if it's in JSON format
      try {
        if (error.message && error.message.startsWith('{')) {
          const parsedError = JSON.parse(error.message);

          // Handle specific error types
          if (parsedError.type === 'UsernameExistsException') {
            return rejectWithValue('An account with this ID Number already exists.');
          } else if (parsedError.type === 'InvalidParameterException' && parsedError.message.includes('password')) {
            return rejectWithValue('Password does not meet requirements. It must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
          } else if (parsedError.type === 'InvalidParameterException' && parsedError.message.includes('email')) {
            return rejectWithValue('Please provide a valid email address.');
          } else if (parsedError.type === 'InvalidParameterException' && parsedError.message.includes('idNumber')) {
            return rejectWithValue('Please provide a valid South African ID number.');
          } else if (parsedError.message && parsedError.message.includes('Attributes did not conform to the schema')) {
            // Handle schema validation errors
            console.error('Schema validation error:', parsedError.message);
            return rejectWithValue('Registration failed due to invalid attributes. Please contact support.');
          }

          // Return the parsed error message if no specific case matches
          return rejectWithValue(parsedError.message || 'Registration failed');
        }
      } catch (parseError) {
        // If parsing fails, fall back to the original error handling
        console.error('Error parsing error message:', parseError);
      }

      // Fall back to original error handling for non-JSON errors
      if (error.message && error.message.includes('UsernameExistsException')) {
        return rejectWithValue('An account with this ID Number already exists.');
      } else if (error.message && error.message.includes('InvalidParameterException') && error.message.includes('password')) {
        return rejectWithValue('Password does not meet requirements. It must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
      } else if (error.message && error.message.includes('InvalidParameterException') && error.message.includes('email')) {
        return rejectWithValue('Please provide a valid email address.');
      } else if (error.message && error.message.includes('Attributes did not conform to the schema')) {
        // Handle schema validation errors
        console.error('Schema validation error:', error.message);
        return rejectWithValue('Registration failed due to invalid attributes. Please contact support.');
      }

      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk for confirming registration with verification code
export const confirmRegistration = createAsyncThunk(
  'auth/confirmRegistration',
  async ({ idNumber, code, documentType }, { rejectWithValue }) => {
    try {
      // Get Cognito configuration from environment variables
      const cognitoConfig = getCognitoConfig();

      // Log configuration for debugging
      logCognitoConfig('Confirmation', cognitoConfig);

      // TEMPORARY WORKAROUND: Pad passport numbers for confirmation
      // Determine if we need to pad the identifier (for passport numbers)
      // If documentType is not provided, try to detect from the format
      const detectedDocType = documentType ||
                             (idNumber.length < 13 ? 'passport' : 'idNumber');

      const paddedIdentifier = padIdentifierForCognito(idNumber, detectedDocType);

      console.log(`Confirmation - Document type: ${detectedDocType}, Original: ${idNumber}, Padded: ${paddedIdentifier}`);

      // Using our custom confirmation function
      await cognitoConfirmSignUp(
        paddedIdentifier, // Using padded identifier as username
        code,
        cognitoConfig.userPoolWebClientId,
        cognitoConfig.clientSecret,
        cognitoConfig.region
      );

      return {
        success: true,
        message: 'Email verification successful. You can now log in.'
      };
    } catch (error) {
      console.error('Confirmation error:', error);
      return rejectWithValue(error.message || 'Verification failed');
    }
  }
);

// Async thunk for resending verification code
export const resendVerificationCode = createAsyncThunk(
  'auth/resendVerificationCode',
  async (idNumber, { rejectWithValue }) => {
    try {
      // Get Cognito configuration from environment variables
      const cognitoConfig = getCognitoConfig();

      // Log configuration for debugging
      logCognitoConfig('Resend Verification Code', cognitoConfig);

      // TEMPORARY WORKAROUND: Handle padded passport numbers for resending verification code
      // Determine if we need to pad the identifier (for passport numbers)
      const detectedDocType = idNumber.length < 13 ? 'passport' : 'idNumber';
      const paddedIdentifier = padIdentifierForCognito(idNumber, detectedDocType);

      console.log(`Resend Code - Document type: ${detectedDocType}, Original: ${idNumber}, Padded: ${paddedIdentifier}`);

      // Using our custom resend confirmation code function
      await cognitoResendConfirmationCode(
        paddedIdentifier, // Using padded identifier as username
        cognitoConfig.userPoolWebClientId,
        cognitoConfig.clientSecret,
        cognitoConfig.region
      );

      return {
        success: true,
        message: 'Verification code has been resent to your email.'
      };
    } catch (error) {
      console.error('Resend verification code error:', error);
      return rejectWithValue(error.message || 'Failed to resend verification code');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clear tokens from localStorage
      localStorage.removeItem('auth_id_token');
      localStorage.removeItem('auth_access_token');
      localStorage.removeItem('auth_refresh_token');
      localStorage.removeItem('auth_user');

      // Call Amplify's signOut with global option to clear all auth state
      try {
        await signOut({ global: true });
        console.log('Successfully signed out from Amplify');
      } catch (e) {
        // Log but don't fail on Amplify signOut errors
        console.log('Amplify signOut error (handled):', e);
      }

      return { success: true };
    } catch (error) {
      // Even if there's an error, clear localStorage
      localStorage.removeItem('auth_id_token');
      localStorage.removeItem('auth_access_token');
      localStorage.removeItem('auth_refresh_token');
      localStorage.removeItem('auth_user');

      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Async thunk for checking if user is authenticated
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Try to get the current authenticated user from Amplify
      try {
        await getCurrentUser(); // Verify user is authenticated
        const { tokens } = await fetchAuthSession();

        // Try to decode the ID token to get user attributes
        const idToken = tokens.idToken.toString();
        const decodedToken = decodeJWT(idToken);
        console.log('Decoded ID token during status check:', decodedToken);

        // Fetch user attributes from Amplify as a backup
        let userAttributes = {};
        try {
          userAttributes = await fetchUserAttributes();
          console.log('User attributes fetched during status check:', userAttributes);
        } catch (attributesError) {
          console.error('Error fetching user attributes during status check:', attributesError);
        }

        // Get existing user from localStorage
        let user = JSON.parse(localStorage.getItem('auth_user') || '{}');

        // Update user with fresh attributes from token and Amplify
        user = {
          ...user,
          // Prefer token data, then Amplify attributes, then existing data
          name: decodedToken?.name || userAttributes.name || user.name || '',
          email: decodedToken?.email || userAttributes.email || user.email || '',
          // Ensure ID number is always available
          idNumber: user.idNumber || decodedToken?.['custom:idNumber'] || userAttributes['custom:idNumber'] || '',
        };

        // Update localStorage with fresh data
        localStorage.setItem('auth_user', JSON.stringify(user));
        console.log('Updated user object with fresh attributes:', user);

        // Return user information and token
        return {
          user: user,
          token: tokens.idToken.toString()
        };
      } catch (amplifyError) {
        console.log('Amplify session check failed:', amplifyError);

        // Fall back to localStorage check
        const user = JSON.parse(localStorage.getItem('auth_user') || '{}');

        if (Object.keys(user).length === 0) {
          throw new Error('No user found in localStorage');
        }

        // Clear any stale Amplify session
        try {
          await signOut({ global: true });
        } catch (signOutError) {
          console.log('Error during stale session cleanup:', signOutError);
          // Continue with the flow even if sign out fails
        }

        throw new Error('Session expired or invalid');
      }
    } catch (error) {
      console.log('Authentication check failed:', error);
      // Clear any potentially corrupted auth data
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_id_token');
      localStorage.removeItem('auth_access_token');
      localStorage.removeItem('auth_refresh_token');

      // User is not authenticated
      return rejectWithValue('Not authenticated');
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (idNumber, { rejectWithValue }) => {
    try {
      // Get Cognito configuration from environment variables
      const cognitoConfig = getCognitoConfig();

      // Log configuration for debugging
      logCognitoConfig('Forgot Password', cognitoConfig);

      // TEMPORARY WORKAROUND: Handle padded passport numbers for password reset
      // Determine if we need to pad the identifier (for passport numbers)
      const detectedDocType = idNumber.length < 13 ? 'passport' : 'idNumber';
      const paddedIdentifier = padIdentifierForCognito(idNumber, detectedDocType);

      console.log(`Forgot Password - Document type: ${detectedDocType}, Original: ${idNumber}, Padded: ${paddedIdentifier}`);

      // Using our custom forgot password function
      await cognitoForgotPassword(
        paddedIdentifier, // Using padded identifier as username
        cognitoConfig.userPoolWebClientId,
        cognitoConfig.clientSecret,
        cognitoConfig.region
      );

      return {
        success: true,
        message: 'Password reset code has been sent to your email.'
      };
    } catch (error) {
      console.error('Password reset request error:', error);
      return rejectWithValue(error.message || 'Password reset request failed');
    }
  }
);

// Async thunk for confirm forgot password
export const confirmForgotPassword = createAsyncThunk(
  'auth/confirmForgotPassword',
  async ({ idNumber, code, newPassword, documentType }, { rejectWithValue }) => {
    try {
      // Get Cognito configuration from environment variables
      const cognitoConfig = getCognitoConfig();

      // Log configuration for debugging
      logCognitoConfig('Confirm Forgot Password', cognitoConfig);

      // TEMPORARY WORKAROUND: Handle padded passport numbers for password reset confirmation
      // Determine if we need to pad the identifier (for passport numbers)
      const detectedDocType = documentType ||
                             (idNumber.length < 13 ? 'passport' : 'idNumber');

      const paddedIdentifier = padIdentifierForCognito(idNumber, detectedDocType);

      console.log(`Confirm Forgot Password - Document type: ${detectedDocType}, Original: ${idNumber}, Padded: ${paddedIdentifier}`);

      // Using our custom confirm forgot password function
      await cognitoConfirmForgotPassword(
        paddedIdentifier, // Using padded identifier as username
        code,
        newPassword,
        cognitoConfig.userPoolWebClientId,
        cognitoConfig.clientSecret,
        cognitoConfig.region
      );

      return {
        success: true,
        message: 'Password has been reset successfully. You can now log in with your new password.'
      };
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      return rejectWithValue(error.message || 'Password reset confirmation failed');
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    registrationSuccess: false,
    registrationMessage: null,
    passwordResetRequested: false,
    passwordResetMessage: null,
    verificationSuccess: false,
    verificationMessage: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationStatus: (state) => {
      state.registrationSuccess = false;
      state.registrationMessage = null;
    },
    clearPasswordResetStatus: (state) => {
      state.passwordResetRequested = false;
      state.passwordResetMessage = null;
    },
    clearVerificationStatus: (state) => {
      state.verificationSuccess = false;
      state.verificationMessage = null;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
      // Update localStorage
      localStorage.setItem('auth_user', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Store user in localStorage for persistence
        // (tokens are already stored in the action creator)
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.registrationMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm registration cases
      .addCase(confirmRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationSuccess = true;
        state.verificationMessage = action.payload.message;
      })
      .addCase(confirmRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Resend verification code cases
      .addCase(resendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationMessage = action.payload.message;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        // Tokens and user are removed in the action creator
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetRequested = true;
        state.passwordResetMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm forgot password cases
      .addCase(confirmForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetRequested = false;
        state.passwordResetMessage = action.payload.message;
      })
      .addCase(confirmForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearError,
  clearRegistrationStatus,
  clearPasswordResetStatus,
  clearVerificationStatus,
  updateUserProfile
} = authSlice.actions;

export default authSlice.reducer;
