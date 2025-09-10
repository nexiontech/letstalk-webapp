/*src/components/LoginForm.jsx*/

import React, { useState, useEffect } from 'react';
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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
// Removed Amplify and Redux dependencies for MVP
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faIdCard,
  faPassport,
} from '@fortawesome/free-solid-svg-icons';
import { validateIdNumber, validatePassportNumber } from '../utils/authUtils';
import './AuthForms.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
    documentType: 'idNumber', // 'idNumber' or 'passport'
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [identifierError, setIdentifierError] = useState(''); // TODO: Implement field-specific errors
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [unverifiedUser, setUnverifiedUser] = useState(null);
  const navigate = useNavigate();
  const { login, isAuthenticated, error, clearAuthError } = useAuth();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear any auth errors when component mounts or unmounts
  useEffect(() => {
    clearAuthError();
    return () => clearAuthError();
  }, [clearAuthError]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    try {
      // Validate identifier based on document type
      if (formData.documentType === 'idNumber') {
        if (!validateIdNumber(formData.identifier)) {
          setLoginError(
            'Please enter a valid 13-digit South African ID number'
          );
          setIsSubmitting(false);
          return;
        }
      } else {
        // Validate passport number
        const passportValidation = validatePassportNumber(formData.identifier);
        if (!passportValidation.isValid) {
          setLoginError(passportValidation.error);
          setIsSubmitting(false);
          return;
        }
      }

      // Call the login function from our auth context with document type
      const result = await login(
        formData.identifier,
        formData.password,
        formData.documentType
      );

      if (result.success) {
        // Login successful, will redirect via the useEffect above
      } else if (result.userConfirmationRequired) {
        // User needs to verify their email
        setUnverifiedUser(formData.identifier);
        // Store document type for verification
        localStorage.setItem('temp_document_type', formData.documentType);
        setShowVerificationDialog(true);
      } else {
        // Login failed
        setLoginError(
          result.error || 'Login failed. Please check your credentials.'
        );
      }
    } catch {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simplified verification for MVP (always succeeds)
  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) {
      setLoginError('Please enter the verification code');
      return;
    }

    setIsSubmitting(true);
    setLoginError(null);

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Always succeed for MVP
    setShowVerificationDialog(false);
    setVerificationCode('');

    // Auto-login after verification
    const loginResult = await login(
      unverifiedUser,
      formData.password,
      formData.documentType
    );

    if (loginResult.success) {
      navigate('/dashboard');
    }

    setIsSubmitting(false);
  };

  const handleResendCode = async () => {
    if (!unverifiedUser) return;

    setIsSubmitting(true);
    setLoginError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Always succeed for MVP
    alert('Verification code has been resent to your email.');
    setIsSubmitting(false);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (name === 'identifier') {
      // Handle different validation for ID vs passport
      if (formData.documentType === 'idNumber') {
        // Only allow digits and limit to 13 characters for ID
        const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 13);
        setFormData(prev => ({
          ...prev,
          [name]: sanitizedValue,
        }));

        // Clear any previous error when user is typing
        setLoginError(null);
      } else {
        // Allow alphanumeric for passport and convert to uppercase
        const sanitizedValue = value
          .replace(/[^A-Za-z0-9]/g, '')
          .toUpperCase()
          .slice(0, 12);
        setFormData(prev => ({
          ...prev,
          [name]: sanitizedValue,
        }));

        // Clear any previous error when user is typing
        setLoginError(null);
      }
    } else if (name === 'documentType') {
      // Passport option is disabled with "Coming Soon" message
      // This is a safeguard in case someone tries to select passport programmatically

      // Always set to idNumber regardless of the selected value
      setFormData(prev => ({
        ...prev,
        [name]: 'idNumber',
        identifier: '', // Reset identifier when switching document types
      }));

      // Clear any previous error
      setLoginError(null);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));

      // Clear any previous error when user is typing
      if (name === 'password') {
        setLoginError(null);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-form-container">
      <h1>Log in to your account</h1>
      <p className="subtitle">Welcome back! Please enter your details.</p>

      {/* MVP Demo Credentials Notice */}
      <Alert severity="info" className="auth-alert" style={{ marginBottom: '1rem' }}>
        <strong>Cloudyn Connect Demo Credentials:</strong><br />
        ID Number: <code>9001010001088</code><br />
        Password: <code>cloudyn123</code><br />
        <small>User: Thabo Mthembu (Johannesburg, SA)</small>
      </Alert>

      {/* Show error message if there is one */}
      {(loginError || error) && (
        <Alert severity="error" className="auth-alert">
          {loginError || error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Document Type Selection */}
        <div className="form-group">
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ marginBottom: '8px' }}>
              Identification Type
            </FormLabel>
            <RadioGroup
              row
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '20px',
              }}
            >
              <FormControlLabel
                value="idNumber"
                control={<Radio />}
                label="South African ID"
                disabled={isSubmitting}
                style={{
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  marginRight: '20px',
                  height: '40px', // Match height with passport option
                }}
              />
              {/* Custom passport option with fake radio button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0px',
                  opacity: 0.6,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  height: '40px', // Match height of the FormControlLabel
                }}
              >
                {/* Fake radio button circle */}
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #bdbdbd',
                    marginRight: '9px',
                    marginLeft: '12px', // Adjusted to match MUI's padding
                    boxSizing: 'border-box',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                ></div>
                <span
                  style={{
                    display: 'inline-block',
                    marginRight: '8px',
                    fontSize: '1rem', // Match MUI's font size
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Match MUI's font
                    lineHeight: '1.5', // Match MUI's line height
                  }}
                >
                  Passport
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    backgroundColor: 'var(--color-secondary-light)',
                    color: 'var(--color-secondary-dark)',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '18px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  Coming Soon
                </span>
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        {/* Conditional ID Number or Passport field */}
        <div className="form-group">
          <div className="input-with-icon">
            <FontAwesomeIcon
              icon={
                formData.documentType === 'idNumber' ? faIdCard : faPassport
              }
              className="input-icon"
            />
            <input
              type="text"
              name="identifier"
              placeholder={
                formData.documentType === 'idNumber'
                  ? 'Enter your ID Number'
                  : 'Enter your Passport Number'
              }
              value={formData.identifier}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="form-hint">
            {formData.documentType === 'idNumber'
              ? 'South African ID Number (13 digits)'
              : 'Passport Number (6-12 alphanumeric characters)'}
          </div>
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              tabIndex="-1"
            >
              <span className="password-toggle-text">
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </button>
          </div>
          <div className="form-hint">
            Minimum 8 characters with letters, numbers & symbols
          </div>
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Remember Me
          </label>
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          style={{ color: 'white' }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={20} color="inherit" />
              <span style={{ marginLeft: '8px' }}>Signing in...</span>
            </>
          ) : (
            'Sign in'
          )}
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>

      {/* Email Verification Dialog */}
      <Dialog
        open={showVerificationDialog}
        onClose={() => setShowVerificationDialog(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              padding: '10px',
              boxShadow:
                '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.05)',
              maxWidth: '450px',
              width: '100%',
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
              border: '1px solid rgba(14, 70, 73, 0.05)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <div
          style={{
            width: '100%',
            height: '5px',
            background:
              'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            marginBottom: '15px',
          }}
        ></div>

        <DialogTitle
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: '700',
            background:
              'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            padding: '10px 24px',
          }}
        >
          Verify Your Email
        </DialogTitle>

        <DialogContent style={{ padding: '20px 24px' }}>
          <p
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '1.05rem',
              color: '#555',
            }}
          >
            Please enter the verification code sent to your email.
          </p>

          <TextField
            autoFocus
            margin="dense"
            label="Verification Code"
            type="text"
            fullWidth
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            disabled={isSubmitting}
            slotProps={{
              input: {
                sx: {
                  borderRadius: '12px',
                  padding: '5px 15px',
                  fontSize: '1.1rem',
                  letterSpacing: '2px',
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'var(--color-primary-light)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--color-primary)',
                  borderWidth: '2px',
                },
              },
            }}
          />

          {loginError && (
            <Alert
              severity="error"
              className="auth-alert"
              style={{
                marginTop: '15px',
                borderRadius: '12px',
                animation: 'fadeIn 0.5s ease-out',
              }}
            >
              {loginError}
            </Alert>
          )}
        </DialogContent>

        <DialogActions
          style={{
            padding: '15px 24px 24px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={handleResendCode}
            disabled={isSubmitting}
            style={{
              color: 'var(--color-secondary)',
              fontWeight: '500',
              textTransform: 'none',
              fontSize: '0.95rem',
            }}
          >
            Resend Code
          </Button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              onClick={() => setShowVerificationDialog(false)}
              disabled={isSubmitting}
              style={{
                borderRadius: '10px',
                textTransform: 'none',
                padding: '8px 16px',
                fontSize: '0.95rem',
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleVerificationSubmit}
              disabled={isSubmitting}
              variant="contained"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                color: 'white',
                borderRadius: '10px',
                padding: '8px 24px',
                boxShadow: '0 4px 12px rgba(14, 70, 73, 0.2)',
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: '600',
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginForm;
