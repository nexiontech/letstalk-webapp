/*src/components/ForgotPasswordForm.jsx*/

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, CircularProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { validateIdNumber, validatePassportNumber } from '../utils/authUtils';
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

    const handleRequestReset = async (e) => {
        e.preventDefault();

        // Validate identifier based on document type
        if (documentType === 'idNumber') {
            if (!validateIdNumber(identifier)) {
                setError('Please enter a valid 13-digit South African ID number');
                return;
            }
        } else {
            // Validate passport number
            const passportValidation = validatePassportNumber(identifier);
            if (!passportValidation.isValid) {
                setError(passportValidation.error);
                return;
            }
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Store document type for step 2
            localStorage.setItem('temp_document_type', documentType);

            const result = await forgotPasswordRequest(identifier);

            if (result.success) {
                setSuccess(result.message || 'Password reset code has been sent to your email.');
                setStep(2); // Move to next step
            } else {
                setError(result.error || 'Failed to request password reset. Please try again.');
            }
        } catch (error) {
            console.error('Password reset request error:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmReset = async (e) => {
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
            const storedDocType = localStorage.getItem('temp_document_type') || 'idNumber';

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
                    <p className="subtitle">Enter your ID Number or Passport Number to reset your password</p>

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
                                <FormLabel component="legend" style={{ marginBottom: '8px' }}>Identification Type</FormLabel>
                                <RadioGroup
                                    row
                                    name="documentType"
                                    value={documentType}
                                    onChange={(e) => setDocumentType(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="idNumber"
                                        control={<Radio />}
                                        label="South African ID"
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value="passport"
                                        control={<Radio />}
                                        label="Passport"
                                        disabled={isSubmitting}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {/* Conditional ID Number or Passport field */}
                        <div className="form-group">
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => {
                                    // Handle different validation for ID vs passport
                                    if (documentType === 'idNumber') {
                                        // Only allow digits and limit to 13 characters for ID
                                        const sanitizedValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 13);
                                        setIdentifier(sanitizedValue);
                                    } else {
                                        // Allow alphanumeric for passport and convert to uppercase
                                        const sanitizedValue = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12);
                                        setIdentifier(sanitizedValue);
                                    }
                                }}
                                placeholder={documentType === 'idNumber' ? "ID Number" : "Passport Number"}
                                disabled={isSubmitting}
                                required
                            />
                            <div className="form-hint">
                                {documentType === 'idNumber'
                                    ? 'South African ID Number (13 digits)'
                                    : 'Passport Number (6-12 alphanumeric characters)'}
                            </div>
                        </div>

                        <button type="submit" className="submit-button" disabled={isSubmitting}>
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
                    <p className="subtitle">Enter the verification code sent to your email and your new password</p>

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
                                onChange={(e) => setResetCode(e.target.value)}
                                placeholder="Verification Code"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                disabled={isSubmitting}
                                required
                            />
                            <div className="form-hint">Minimum 8 characters with letters, numbers & symbols</div>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button" disabled={isSubmitting}>
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