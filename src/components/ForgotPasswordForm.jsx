/*src/components/ForgotPasswordForm.jsx*/

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, CircularProgress } from '@mui/material';
import { validateIdNumber } from '../utils/authUtils';
import './AuthForms.css';

function ForgotPasswordForm() {
    const [idNumber, setIdNumber] = useState('');
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
    }, [idNumber, resetCode, newPassword, confirmPassword]);

    const handleRequestReset = async (e) => {
        e.preventDefault();

        // Validate ID Number
        if (!validateIdNumber(idNumber)) {
            setError('Please enter a valid 13-digit South African ID number');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await forgotPasswordRequest(idNumber);

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
            const result = await confirmPasswordReset(idNumber, resetCode, newPassword);

            if (result.success) {
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
                    <p className="subtitle">Enter your ID Number to reset your password</p>

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
                        <div className="form-group">
                            <input
                                type="text"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="ID Number"
                                disabled={isSubmitting}
                                required
                            />
                            <div className="form-hint">South African ID Number (13 digits)</div>
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