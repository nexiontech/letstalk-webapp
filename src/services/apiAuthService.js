// src/services/apiAuthService.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY || 'your-api-key'; // This should be stored securely or fetched from environment variables

// Async thunk for login
export const loginUser = createAsyncThunk(
  'apiAuth/login',
  async ({ idNumber, password }, { rejectWithValue }) => {
    try {
      console.log('Attempting login via API Gateway...');

      // For development testing only - using a dummy successful response
      // Remove this when API Gateway CORS is configured
      console.log('Using dummy response for development testing');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return dummy successful response
      return {
        user: {
          idNumber: idNumber,
          name: 'Test User',
          email: 'test@example.com'
        },
        token: 'dummy-jwt-token'
      };

      /* Uncomment this when API Gateway CORS is configured
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ idNumber, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Store user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      localStorage.setItem('auth_token', data.token);

      return {
        user: data.user,
        token: data.token
      };
      */
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'apiAuth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting registration via API Gateway...');

      // For development testing only - using a dummy successful response
      // Remove this when API Gateway CORS is configured
      console.log('Using dummy response for development testing');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Return dummy successful response
      return {
        success: true,
        message: 'Registration successful. Please check your email for verification.'
      };

      /* Uncomment this when API Gateway CORS is configured
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          idNumber: userData.idNumber,
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      return {
        success: true,
        message: data.message || 'Registration successful. Please check your email for verification.'
      };
      */
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk for checking auth status
export const checkAuthStatus = createAsyncThunk(
  'apiAuth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Check if we have a token in localStorage
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('auth_user') || 'null');

      if (!token || !user) {
        return rejectWithValue('Not authenticated');
      }

      // In a real implementation, you would validate the token with the API
      // For now, we'll just return the user from localStorage

      return {
        user,
        token
      };
    } catch (error) {
      // Clear any potentially corrupted auth data
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');

      return rejectWithValue('Not authenticated');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'apiAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');

      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Create the auth slice
const apiAuthSlice = createSlice({
  name: 'apiAuth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    registrationStatus: null,
    passwordResetStatus: null,
    verificationStatus: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationStatus: (state) => {
      state.registrationStatus = null;
    },
    clearPasswordResetStatus: (state) => {
      state.passwordResetStatus = null;
    },
    clearVerificationStatus: (state) => {
      state.verificationStatus = null;
    }
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Login failed';
    });

    // Registration cases
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.registrationStatus = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registrationStatus = {
        success: true,
        message: action.payload.message
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Registration failed';
    });

    // Check auth status cases
    builder.addCase(checkAuthStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });

    // Logout cases
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Logout failed';
    });
  }
});

export const {
  clearError,
  clearRegistrationStatus,
  clearPasswordResetStatus,
  clearVerificationStatus
} = apiAuthSlice.actions;

export default apiAuthSlice.reducer;
