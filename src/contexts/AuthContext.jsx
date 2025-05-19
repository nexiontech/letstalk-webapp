// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
  confirmRegistration,
  resendVerificationCode,
  forgotPassword,
  confirmForgotPassword,
  clearError,
  clearRegistrationStatus,
  clearPasswordResetStatus,
  clearVerificationStatus
} from '../services/amplifyAuthService';

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
  const login = async (idNumber, password, documentType) => {
    try {
      // Pass document type for the passport number padding workaround
      const resultAction = await dispatch(loginUser({
        idNumber,
        password,
        documentType // Include document type for proper padding
      }));

      if (loginUser.fulfilled.match(resultAction)) {
        return { success: true };
      } else {
        // Check if this is a user not confirmed error
        if (resultAction.payload && resultAction.payload.includes('not confirmed')) {
          return {
            success: false,
            userConfirmationRequired: true,
            error: 'Please verify your email before logging in.'
          };
        }
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

  // Forgot password function
  const forgotPasswordRequest = async (idNumber) => {
    try {
      const resultAction = await dispatch(forgotPassword(idNumber));
      if (forgotPassword.fulfilled.match(resultAction)) {
        return {
          success: true,
          message: resultAction.payload.message
        };
      } else {
        return {
          success: false,
          error: resultAction.payload || 'Password reset request failed'
        };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Password reset request failed' };
    }
  };

  // Confirm forgot password function
  const confirmPasswordReset = async (idNumber, code, newPassword, documentType) => {
    try {
      const resultAction = await dispatch(confirmForgotPassword({
        idNumber,
        code,
        newPassword,
        documentType // Pass document type for proper padding
      }));
      if (confirmForgotPassword.fulfilled.match(resultAction)) {
        return {
          success: true,
          message: resultAction.payload.message
        };
      } else {
        return {
          success: false,
          error: resultAction.payload || 'Password reset confirmation failed'
        };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Password reset confirmation failed' };
    }
  };

  // Clear any auth errors
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Clear registration status
  const clearRegStatus = () => {
    dispatch(clearRegistrationStatus());
  };

  // Clear password reset status
  const clearPwdResetStatus = () => {
    dispatch(clearPasswordResetStatus());
  };

  // Clear verification status
  const clearVerifStatus = () => {
    dispatch(clearVerificationStatus());
  };

  // Create the context value
  const contextValue = {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    registrationSuccess: auth.registrationSuccess,
    registrationMessage: auth.registrationMessage,
    passwordResetRequested: auth.passwordResetRequested,
    passwordResetMessage: auth.passwordResetMessage,
    verificationSuccess: auth.verificationSuccess,
    verificationMessage: auth.verificationMessage,
    login,
    register,
    logout,
    forgotPasswordRequest,
    confirmPasswordReset,
    clearAuthError,
    clearRegStatus,
    clearPwdResetStatus,
    clearVerifStatus
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
