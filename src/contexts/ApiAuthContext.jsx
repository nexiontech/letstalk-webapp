// src/contexts/ApiAuthContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
  clearError,
  clearRegistrationStatus,
  clearPasswordResetStatus,
  clearVerificationStatus
} from '../services/apiAuthService';

// Create the context
const ApiAuthContext = createContext();

// Create a provider component
export const ApiAuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.apiAuth);

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Login function
  const login = async (idNumber, password) => {
    try {
      const resultAction = await dispatch(loginUser({ idNumber, password }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: resultAction.payload || 'Login failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const resultAction = await dispatch(registerUser(userData));
      
      if (registerUser.fulfilled.match(resultAction)) {
        return { 
          success: true, 
          message: resultAction.payload.message 
        };
      } else {
        return { 
          success: false, 
          error: resultAction.payload || 'Registration failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      
      if (logoutUser.fulfilled.match(resultAction)) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: resultAction.payload || 'Logout failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      };
    }
  };

  // Clear error function
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Clear registration status function
  const clearAuthRegistrationStatus = () => {
    dispatch(clearRegistrationStatus());
  };

  // The value that will be provided to consumers of this context
  const value = {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.isLoading,
    error: auth.error,
    registrationStatus: auth.registrationStatus,
    login,
    logout,
    register,
    clearAuthError,
    clearAuthRegistrationStatus
  };

  return (
    <ApiAuthContext.Provider value={value}>
      {children}
    </ApiAuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useApiAuth = () => {
  const context = useContext(ApiAuthContext);
  if (!context) {
    throw new Error('useApiAuth must be used within an ApiAuthProvider');
  }
  return context;
};
