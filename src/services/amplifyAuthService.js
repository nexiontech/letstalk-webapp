// src/services/amplifyAuthService.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser, fetchAuthSession, resetPassword, confirmResetPassword } from 'aws-amplify/auth';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ idNumber, password }, { rejectWithValue }) => {
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

      // Now attempt to sign in
      const signInResponse = await signIn({
        username: idNumber,  // Using ID Number as username
        password,
        options: {
          authFlowType: 'USER_PASSWORD_AUTH'
        }
      });

      // Get the current user and session
      const currentUser = await getCurrentUser();
      const { tokens } = await fetchAuthSession();

      // Create user object from available information
      const user = {
        idNumber: idNumber,
        email: '', // Will be updated with attributes later
        name: '', // Will be updated with attributes later
      };

      // Store user in localStorage for persistence
      localStorage.setItem('auth_user', JSON.stringify(user));

      return {
        user: user,
        token: tokens.idToken.toString()
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
          // Try to get the current user and session
          const currentUser = await getCurrentUser();
          const { tokens } = await fetchAuthSession();

          // Create user object from available information
          const user = {
            idNumber: idNumber, // We don't know if this is correct, but it's what the user entered
            email: '',
            name: '',
          };

          // Store user in localStorage
          localStorage.setItem('auth_user', JSON.stringify(user));

          return {
            user: user,
            token: tokens.idToken.toString()
          };
        } catch (innerError) {
          // If we can't get the current user, force sign out and ask to try again
          try {
            await signOut({ global: true });
          } catch {}
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
      // Using Amplify's signUp function directly
      await signUp({
        username: userData.idNumber, // Using ID Number as username
        password: userData.password,
        options: {
          userAttributes: {
            email: userData.email,
            name: userData.name,
            'custom:idNumber': userData.idNumber
          },
          authFlowType: 'USER_PASSWORD_AUTH'
        }
      });

      return {
        success: true,
        message: 'Registration successful. Please check your email for verification.'
      };
    } catch (error) {
      console.error('Registration error:', error);
      // Handle specific error cases
      if (error.message && error.message.includes('UsernameExistsException')) {
        return rejectWithValue('An account with this ID Number already exists.');
      } else if (error.message && error.message.includes('InvalidParameterException') && error.message.includes('password')) {
        return rejectWithValue('Password does not meet requirements. It must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
      } else if (error.message && error.message.includes('InvalidParameterException') && error.message.includes('email')) {
        return rejectWithValue('Please provide a valid email address.');
      }
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk for confirming registration with verification code
export const confirmRegistration = createAsyncThunk(
  'auth/confirmRegistration',
  async ({ idNumber, code }, { rejectWithValue }) => {
    try {
      // Using Amplify's confirmSignUp function directly
      await confirmSignUp({
        username: idNumber, // Using ID Number as username
        confirmationCode: code
      });

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
      // Using Amplify's resendSignUpCode function directly
      await signUp.resendSignUpCode({
        username: idNumber // Using ID Number as username
      });

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
        const currentUser = await getCurrentUser();
        const { tokens } = await fetchAuthSession();

        // Get user from localStorage or create a basic one
        const user = JSON.parse(localStorage.getItem('auth_user') || '{}');

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
        } catch {}

        throw new Error('Session expired or invalid');
      }
    } catch (error) {
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
      await resetPassword({
        username: idNumber // Use ID Number as username
      });
      return {
        success: true,
        message: 'Password reset code has been sent to your email.'
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Password reset request failed');
    }
  }
);

// Async thunk for confirm forgot password
export const confirmForgotPassword = createAsyncThunk(
  'auth/confirmForgotPassword',
  async ({ idNumber, code, newPassword }, { rejectWithValue }) => {
    try {
      await confirmResetPassword({
        username: idNumber, // Use ID Number as username
        confirmationCode: code,
        newPassword
      });
      return {
        success: true,
        message: 'Password has been reset successfully. You can now log in with your new password.'
      };
    } catch (error) {
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
  clearVerificationStatus
} = authSlice.actions;

export default authSlice.reducer;
