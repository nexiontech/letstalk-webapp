// src/components/RegisterForm.jsx - Simplified MVP Version
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { validateEmail, validateIdNumber } from '../utils/authUtils';
import './AuthForms.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!validateIdNumber(formData.idNumber)) {
      setError('Please enter a valid 13-digit South African ID number');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const userData = {
        idNumber: formData.idNumber,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      };

      const result = await register(userData);

      if (result.success) {
        console.log('🚀 MVP Registration successful');
        setShowVerificationDialog(true);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    // Simulate verification for MVP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowVerificationDialog(false);
    alert('Registration completed successfully! You can now log in.');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our citizen engagement platform</p>
        </div>

        {error && (
          <Alert severity="error" className="auth-alert">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                <FontAwesomeIcon icon={faUser} className="form-icon" />
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                <FontAwesomeIcon icon={faUser} className="form-icon" />
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="+27 XX XXX XXXX"
            />
          </div>

          <div className="form-group">
            <label htmlFor="idNumber" className="form-label">
              <FontAwesomeIcon icon={faIdCard} className="form-icon" />
              South African ID Number
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="13-digit ID number"
              maxLength="13"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FontAwesomeIcon icon={faLock} className="form-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <FontAwesomeIcon icon={faLock} className="form-icon" />
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              I agree to the{' '}
              <Link to="/terms-of-service" className="auth-link">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="auth-link">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={20} color="inherit" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Verification Dialog */}
      <Dialog open={showVerificationDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Verify Your Email</DialogTitle>
        <DialogContent>
          <p>We've sent a verification code to your email address. Please enter it below:</p>
          <TextField
            fullWidth
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            margin="normal"
            placeholder="Enter 6-digit code"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVerificationDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleVerificationSubmit} variant="contained">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RegisterForm;
