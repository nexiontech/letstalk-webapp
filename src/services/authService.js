// src/services/authService.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Dummy user credentials
const DUMMY_USER = {
  idNumber: '7208145695082',
  password: 'P@ssword',
  name: 'Test User',
  email: 'testuser@example.com',
  role: 'citizen',
  profilePicture: null
};

// Check if we're using the dummy user bypass
const useDummyUser = () => {
  return process.env.NODE_ENV === 'development' || 
         import.meta.env.VITE_USE_DUMMY_USER === 'true';
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ idNumber, password }, { rejectWithValue }) => {
    try {
      // Check if we should use the dummy user
      if (useDummyUser() && 
          idNumber === DUMMY_USER.idNumber && 
          password === DUMMY_USER.password) {
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return dummy user data
        return {
          user: {
            idNumber: DUMMY_USER.idNumber,
            name: DUMMY_USER.name,
            email: DUMMY_USER.email,
            role: DUMMY_USER.role,
            profilePicture: DUMMY_USER.profilePicture
          },
          token: 'dummy-jwt-token'
        };
      }
      
      // In a real implementation, this would call AWS Cognito
      // For now, we'll reject if it's not the dummy user
      if (useDummyUser()) {
        return rejectWithValue('Invalid credentials');
      }
      
      // This would be the actual AWS Cognito implementation
      // const response = await Auth.signIn(idNumber, password);
      // return { user: response.attributes, token: response.signInUserSession.idToken.jwtToken };
      
      // For now, just reject
      return rejectWithValue('AWS Cognito not implemented yet');
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // In a real implementation, this would call AWS Cognito
      // For now, we'll just simulate success for the dummy user
      if (useDummyUser()) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          success: true,
          message: 'Registration successful. Please check your email for verification.'
        };
      }
      
      // This would be the actual AWS Cognito implementation
      // const response = await Auth.signUp({
      //   username: userData.idNumber,
      //   password: userData.password,
      //   attributes: {
      //     email: userData.email,
      //     name: userData.name,
      //   }
      // });
      // return { success: true, message: 'Registration successful' };
      
      return rejectWithValue('AWS Cognito not implemented yet');
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // In a real implementation, this would call AWS Cognito
      // For now, we'll just simulate success
      if (useDummyUser()) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return { success: true };
      }
      
      // This would be the actual AWS Cognito implementation
      // await Auth.signOut();
      // return { success: true };
      
      return rejectWithValue('AWS Cognito not implemented yet');
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Async thunk for checking if user is authenticated
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Check if we have a token in localStorage
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('auth_user');
      
      if (token && userData) {
        return {
          user: JSON.parse(userData),
          token
        };
      }
      
      // In a real implementation, this would call AWS Cognito
      // For now, we'll just return not authenticated
      return rejectWithValue('Not authenticated');
      
      // This would be the actual AWS Cognito implementation
      // const user = await Auth.currentAuthenticatedUser();
      // return {
      //   user: user.attributes,
      //   token: user.signInUserSession.idToken.jwtToken
      // };
    } catch (error) {
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
