/*src/components/ForgotPasswordForm.jsx*/

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Alert,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { validateIdNumber } from '../utils/authUtils';
import './AuthForms.css';

function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState('');
  const [documentType, setDocumentType] = useState('idNumber'); // 'idNumber' or 'passport'
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Request reset, 2: Enter code and new password
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { forgotPasswordRequest, confirmPasswordReset } = useAuth();

  // Clear messages when inputs change
  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [identifier, resetCode, newPassword, confirmPassword]);

  const handleRequestReset = async e => {
    e.preventDefault();

    // Always validate as South African ID since passport option is disabled
    if (!validateIdNumber(identifier)) {
      setError('Please enter a valid 13-digit South African ID number');
      return;
    }

    // Force document type to be idNumber
    setDocumentType('idNumber');

    setIsSubmitting(true);
    setError(null);

    try {
      // Store document type for step 2
      localStorage.setItem('temp_document_type', documentType);

      const result = await forgotPasswordRequest(identifier);

      if (result.success) {
        setSuccess(
          result.message || 'Password reset code has been sent to your email.'
        );
        setStep(2); // Move to next step
      } else {
        setError(
          result.error || 'Failed to request password reset. Please try again.'
        );
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmReset = async e => {
    e.preventDefault();

    // Validate reset code
    if (!resetCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    // Validate password
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Get the document type from localStorage
      const storedDocType =
        localStorage.getItem('temp_document_type') || 'idNumber';

      const result = await confirmPasswordReset(
        identifier,
        resetCode,
        newPassword,
        storedDocType // Pass document type for proper padding
      );

      if (result.success) {
        // Clean up the temporary storage
        localStorage.removeItem('temp_document_type');

        setSuccess(result.message || 'Password has been reset successfully!');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(result.error || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h1>Forgot Password?</h1>
      {step === 1 ? (
        <>
          <p className="subtitle">
            Enter your ID Number or Passport Number to reset your password
          </p>

          {error && (
            <Alert severity="error" className="auth-alert">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="auth-alert">
              {success}
            </Alert>
          )}

          <form onSubmit={handleRequestReset} className="auth-form">
            {/* Document Type Selection */}
            <div className="form-group">
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{ marginBottom: '8px' }}>
                  Identification Type
                </FormLabel>
                <RadioGroup
                  row
                  name="documentType"
                  value={documentType}
                  onChange={() => setDocumentType('idNumber')} // Always set to idNumber
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
                        fontFamily:
                          '"Roboto", "Helvetica", "Arial", sans-serif', // Match MUI's font
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
              <input
                type="text"
                value={identifier}
                onChange={e => {
                  // Only allow digits and limit to 13 characters for South African ID
                  const sanitizedValue = e.target.value
                    .replace(/[^0-9]/g, '')
                    .slice(0, 13);
                  setIdentifier(sanitizedValue);
                }}
                placeholder="ID Number"
                disabled={isSubmitting}
                required
              />
              <div className="form-hint">
                South African ID Number (13 digits)
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span style={{ marginLeft: '8px' }}>Sending...</span>
                </>
              ) : (
                'Send Reset Code'
              )}
            </button>

            <p className="auth-link">
              <Link to="/login">Back to Log In</Link>
            </p>
          </form>
        </>
      ) : (
        <>
          <p className="subtitle">
            Enter the verification code sent to your email and your new password
          </p>

          {error && (
            <Alert severity="error" className="auth-alert">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="auth-alert">
              {success}
            </Alert>
          )}

          <form onSubmit={handleConfirmReset} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                value={resetCode}
                onChange={e => setResetCode(e.target.value)}
                placeholder="Verification Code"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password"
                disabled={isSubmitting}
                required
              />
              <div className="form-hint">
                Minimum 8 characters with letters, numbers & symbols
              </div>
            </div>

            <div className="form-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                disabled={isSubmitting}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span style={{ marginLeft: '8px' }}>Resetting...</span>
                </>
              ) : (
                'Reset Password'
              )}
            </button>

            <p className="auth-link">
              <Link to="/login">Back to Log In</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
}

export default ForgotPasswordForm;
