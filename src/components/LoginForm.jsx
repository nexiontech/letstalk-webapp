/*src/components/LoginForm.jsx*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip } from '@mui/material';
import { confirmRegistration, resendVerificationCode, logoutUser } from '../services/amplifyAuthService';
import { useDispatch } from 'react-redux';
import './AuthForms.css';

function LoginForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: '',
        rememberMe: false,
    });
    const [loginError, setLoginError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showVerificationDialog, setShowVerificationDialog] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [unverifiedUser, setUnverifiedUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoginError(null);

        try {
            // Call the login function from our auth context
            const result = await login(formData.idNumber, formData.password);

            if (result.success) {
                // Login successful, will redirect via the useEffect above
            } else if (result.userConfirmationRequired) {
                // User needs to verify their email
                setUnverifiedUser(formData.idNumber);
                setShowVerificationDialog(true);
            } else {
                // Login failed
                setLoginError(result.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationSubmit = async () => {
        if (!verificationCode.trim()) {
            setLoginError('Please enter the verification code');
            return;
        }

        setIsSubmitting(true);
        setLoginError(null);

        try {
            const result = await dispatch(confirmRegistration({ idNumber: unverifiedUser, code: verificationCode }));

            if (confirmRegistration.fulfilled.match(result)) {
                setShowVerificationDialog(false);
                setVerificationCode('');
                // Try to log in automatically after verification
                await login(formData.idNumber, formData.password);
            } else {
                setLoginError(result.payload || 'Verification failed. Please try again.');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred during verification. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        if (!unverifiedUser) return;

        setIsSubmitting(true);
        setLoginError(null);

        try {
            const result = await dispatch(resendVerificationCode(unverifiedUser));

            if (resendVerificationCode.fulfilled.match(result)) {
                alert('Verification code has been resent to your email.');
            } else {
                setLoginError(result.payload || 'Failed to resend verification code. Please try again.');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClearSession = async () => {
        setIsSubmitting(true);
        setLoginError(null);

        try {
            // Call the logout function to clear any existing session
            await dispatch(logoutUser());
            setLoginError(null);
            alert('Session cleared successfully. You can now try logging in again.');
        } catch (error) {
            setLoginError('Failed to clear session. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = () => {
        // This would integrate with AWS Cognito's federated identity
        // For now, we'll just show a message
        alert('Google Sign-In will be implemented with AWS Cognito federated identity.');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="auth-form-container">
            <h1>Log in to your account</h1>
            <p className="subtitle">Welcome back! Please enter your details.</p>

            {/* Show error message if there is one */}
            {(loginError || error) && (
                <Alert severity="error" className="auth-alert">
                    {loginError || error}
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="Enter your ID Number"
                        value={formData.idNumber}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    <div className="form-hint">South African ID Number (13 digits)</div>
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    <div className="form-hint">Minimum 8 characters with letters, numbers & symbols</div>
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

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="google-sso flex items-center"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                >
                    <img src="/google-icon.png" alt="" className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button>

                <p className="auth-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>

                <div className="auth-help-links">
                    <Tooltip title="Use this if you're having trouble logging in due to session conflicts">
                        <button
                            type="button"
                            className="text-button"
                            onClick={handleClearSession}
                            disabled={isSubmitting}
                        >
                            Clear Session
                        </button>
                    </Tooltip>
                </div>
            </form>

            {/* Email Verification Dialog */}
            <Dialog open={showVerificationDialog} onClose={() => setShowVerificationDialog(false)}>
                <DialogTitle>Verify Your Email</DialogTitle>
                <DialogContent>
                    <p>Please enter the verification code sent to your email.</p>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Verification Code"
                        type="text"
                        fullWidth
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        disabled={isSubmitting}
                    />
                    {loginError && (
                        <Alert severity="error" className="auth-alert" style={{ marginTop: '10px' }}>
                            {loginError}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleResendCode} disabled={isSubmitting}>
                        Resend Code
                    </Button>
                    <Button onClick={() => setShowVerificationDialog(false)} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleVerificationSubmit} disabled={isSubmitting} variant="contained" color="primary">
                        {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Verify'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginForm;
