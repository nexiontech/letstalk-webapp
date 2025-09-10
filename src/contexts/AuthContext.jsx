// src/contexts/AuthContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
  // confirmRegistration, // TODO: Add email confirmation functionality
  // resendVerificationCode, // TODO: Add resend verification functionality
  forgotPassword,
  confirmForgotPassword,
  clearError,
  clearRegistrationStatus,
  clearPasswordResetStatus,
  clearVerificationStatus,
} from '../services/amplifyAuthService';
import { isAuthBypassEnabled, getMockUser } from '../utils/envUtils';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [bypassAuth, setBypassAuth] = useState(false);
  const [mockUser, setMockUser] = useState(null);

  // Check if auth bypass is enabled and set up mock auth state
  useEffect(() => {
    const shouldBypass = isAuthBypassEnabled();
    setBypassAuth(shouldBypass);

    if (shouldBypass) {
      const mockUserData = getMockUser();
      setMockUser(mockUserData);
      console.log('🚀 Auth bypass enabled for development - Mock user:', mockUserData);
    } else {
      // Check authentication status normally
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  // Login function
  const login = async (idNumber, password, documentType) => {
    try {
      // Pass document type for the passport number padding workaround
      const resultAction = await dispatch(
        loginUser({
          idNumber,
          password,
          documentType, // Include document type for proper padding
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        return { success: true };
      } else {
        // Check if this is a user not confirmed error
        if (
          resultAction.payload &&
          resultAction.payload.includes('not confirmed')
        ) {
          return {
            success: false,
            userConfirmationRequired: true,
            error: 'Please verify your email before logging in.',
          };
        }
        return {
          success: false,
          error: resultAction.payload || 'Login failed',
        };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  // Register function
  const register = async userData => {
    try {
      const resultAction = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(resultAction)) {
        return {
          success: true,
          message: resultAction.payload.message,
        };
      } else {
        return {
          success: false,
          error: resultAction.payload || 'Registration failed',
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
  const forgotPasswordRequest = async idNumber => {
    try {
      const resultAction = await dispatch(forgotPassword(idNumber));
      if (forgotPassword.fulfilled.match(resultAction)) {
        return {
          success: true,
          message: resultAction.payload.message,
        };
      } else {
        return {
          success: false,
          error: resultAction.payload || 'Password reset request failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset request failed',
      };
    }
  };

  // Confirm forgot password function
  const confirmPasswordReset = async (
    idNumber,
    code,
    newPassword,
    documentType
  ) => {
    try {
      const resultAction = await dispatch(
        confirmForgotPassword({
          idNumber,
          code,
          newPassword,
          documentType, // Pass document type for proper padding
        })
      );
      if (confirmForgotPassword.fulfilled.match(resultAction)) {
        return {
          success: true,
          message: resultAction.payload.message,
        };
      } else {
        return {
          success: false,
          error: resultAction.payload || 'Password reset confirmation failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset confirmation failed',
      };
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

  // Create the context value with bypass support
  const contextValue = {
    user: bypassAuth ? mockUser : auth.user,
    isAuthenticated: bypassAuth ? true : auth.isAuthenticated,
    loading: bypassAuth ? false : auth.loading,
    error: bypassAuth ? null : auth.error,
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
    clearVerifStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
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
