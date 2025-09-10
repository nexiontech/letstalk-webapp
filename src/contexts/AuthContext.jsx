// src/contexts/AuthContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMockUser } from '../utils/envUtils';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock user data for MVP
  useEffect(() => {
    const mockUserData = getMockUser();
    setUser(mockUserData);
    console.log('🚀 MVP Mode - Using mock user:', mockUserData);
  }, []);

  // Dummy login credentials for MVP - South African user
  const DUMMY_CREDENTIALS = {
    idNumber: '9001010001088',
    password: 'cloudyn123',
    email: 'thabo.mthembu@cloudynconnect.co.za'
  };

  // Simplified login function for MVP with dummy credentials
  const login = async (idNumber, password, documentType) => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check dummy credentials
    if (idNumber === DUMMY_CREDENTIALS.idNumber && password === DUMMY_CREDENTIALS.password) {
      const mockUserData = getMockUser();
      setUser(mockUserData);
      setLoading(false);
      console.log('🚀 MVP Login successful with dummy credentials:', mockUserData);
      return { success: true };
    } else {
      setError('Invalid credentials. Use ID: 9001010001088, Password: cloudyn123');
      setLoading(false);
      return { success: false, error: 'Invalid credentials. Use ID: 9001010001088, Password: cloudyn123' };
    }
  };

  // Simplified register function for MVP (always succeeds)
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Always succeed
    setLoading(false);
    console.log('🚀 MVP Registration successful for:', userData.email);
    return { success: true };
  };

  // Simplified logout function for MVP
  const logout = async () => {
    setUser(null);
    console.log('🚀 MVP Logout successful');
    return { success: true };
  };

  // Simplified forgot password function for MVP (always succeeds)
  const forgotPasswordRequest = async (idNumber) => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoading(false);
    console.log('🚀 MVP Forgot password request successful for:', idNumber);
    return { success: true };
  };

  // Simplified confirm forgot password function for MVP (always succeeds)
  const confirmForgotPasswordHandler = async (idNumber, code, newPassword) => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoading(false);
    console.log('🚀 MVP Password reset successful for:', idNumber);
    return { success: true };
  };

  // Simplified error clearing functions for MVP
  const clearAuthError = () => setError(null);
  const clearRegistrationStatusHandler = () => {};
  const clearPasswordResetStatusHandler = () => {};
  const clearVerificationStatusHandler = () => {};

  // Create the simplified context value for MVP
  const contextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    registrationSuccess: false,
    registrationMessage: '',
    passwordResetRequested: false,
    passwordResetMessage: '',
    verificationSuccess: false,
    verificationMessage: '',
    login,
    register,
    logout,
    forgotPasswordRequest,
    confirmPasswordReset: confirmForgotPasswordHandler,
    clearAuthError,
    clearRegStatus: clearRegistrationStatusHandler,
    clearPwdResetStatus: clearPasswordResetStatusHandler,
    clearVerifStatus: clearVerificationStatusHandler,
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
