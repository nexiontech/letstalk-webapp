// src/services/authService.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signOut,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes
} from 'aws-amplify/auth';
import {
  cognitoSignIn,
  cognitoSignUp
} from '../utils/cognitoAuth';
import { decodeJWT } from '../utils/jwtDecode';

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

      // Get environment variables
      const clientId = import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_COGNITO_CLIENT_SECRET;
      const region = import.meta.env.VITE_COGNITO_REGION;

      console.log('Using Cognito configuration:', {
        region,
        clientId,
        clientSecret: clientSecret ? '***' : 'not set'
      });

      // Now attempt to sign in using our custom function
      const signInResponse = await cognitoSignIn(
        idNumber, // Using ID Number as username
        password,
        clientId,
        clientSecret,
        region
      );

      // Extract tokens from the response
      const idToken = signInResponse.AuthenticationResult.IdToken;
      const accessToken = signInResponse.AuthenticationResult.AccessToken;
      const refreshToken = signInResponse.AuthenticationResult.RefreshToken;

      // Store tokens in localStorage
      localStorage.setItem('auth_id_token', idToken);
      localStorage.setItem('auth_access_token', accessToken);
      localStorage.setItem('auth_refresh_token', refreshToken);

      // Try to decode the ID token to get user attributes
      const decodedToken = decodeJWT(idToken);
      console.log('Decoded ID token:', decodedToken);

      // Create user object with info from the token
      const user = {
        idNumber: idNumber,
        email: decodedToken?.email || '',
        name: decodedToken?.name || '',
        role: 'citizen' // Default role
      };

      // Store user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));

      return {
        user: user,
        token: idToken
      };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Get environment variables
      const clientId = import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_COGNITO_CLIENT_SECRET;
      const region = import.meta.env.VITE_COGNITO_REGION;

      console.log('Using Cognito configuration for registration:', {
        region,
        clientId,
        clientSecret: clientSecret ? '***' : 'not set'
      });

      // Prepare user attributes
      const userAttributes = {
        email: userData.email,
        name: userData.name,
        'custom:idNumber': userData.idNumber
      };

      // Using our custom sign up function
      await cognitoSignUp(
        userData.idNumber, // Using ID Number as username
        userData.password,
        userAttributes,
        clientId,
        clientSecret,
        region
      );

      return {
        success: true,
        message: 'Registration successful. Please check your email for verification.'
      };
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.message || 'Registration failed');
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
      localStorage.removeItem('auth_token');

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
      console.error('Logout error:', error);
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
        const userAttributes = await fetchUserAttributes();

        // Try to decode the ID token to get user attributes
        const idToken = tokens.idToken.toString();
        const decodedToken = decodeJWT(idToken);
        console.log('Decoded ID token during status check:', decodedToken);

        // Create user object with info from attributes and token
        const user = {
          idNumber: userAttributes['custom:idNumber'] || decodedToken?.['custom:idNumber'] || '',
          email: userAttributes.email || decodedToken?.email || '',
          name: userAttributes.name || decodedToken?.name || '',
          role: 'citizen' // Default role
        };

        // Update localStorage with fresh data
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', idToken);
        console.log('Updated user object with fresh attributes:', user);

        // Return user information and token
        return {
          user: user,
          token: idToken
        };
      } catch (amplifyError) {
        console.log('Amplify session check failed:', amplifyError);

        // Fall back to localStorage check
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('auth_user');

        if (token && userData) {
          return {
            user: JSON.parse(userData),
            token
          };
        }

        // Clear any stale Amplify session
        try {
          await signOut({ global: true });
        } catch (e) {
          console.log('Error during signout cleanup:', e);
        }

        throw new Error('Not authenticated');
      }
    } catch (error) {
      console.log('Auth status check failed:', error);
      return rejectWithValue('Not authenticated');
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
    registrationMessage: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationStatus: (state) => {
      state.registrationSuccess = false;
      state.registrationMessage = null;
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

        // Store in localStorage for persistence
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
        state.registrationMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.registrationMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
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

        // Remove from localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
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
      });
  }
});

export const { clearError, clearRegistrationStatus } = authSlice.actions;

export default authSlice.reducer;
