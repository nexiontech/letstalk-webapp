// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, loginUser, logoutUser, registerUser, clearError } from '../services/authService';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
      return { success: false, error: error.message || 'Login failed' };
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
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await dispatch(logoutUser());
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Logout failed' };
    }
  };

  // Clear any auth errors
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Create the context value
  const contextValue = {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    registrationSuccess: auth.registrationSuccess,
    registrationMessage: auth.registrationMessage,
    login,
    register,
    logout,
    clearAuthError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
