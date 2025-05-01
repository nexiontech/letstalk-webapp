/*src/components/LoginForm.jsx*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { confirmRegistration, resendVerificationCode } from '../services/amplifyAuthService';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import './AuthForms.css';

function LoginForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [idNumberError, setIdNumberError] = useState('');
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'idNumber') {
            // Only allow digits and limit to 13 characters
            const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 13);
            setFormData((prev) => ({
                ...prev,
                [name]: sanitizedValue,
            }));

            // Validate ID number length
            if (sanitizedValue.length > 0 && sanitizedValue.length !== 13) {
                setIdNumberError('ID Number must be exactly 13 digits');
            } else {
                setIdNumberError('');
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    <div className="input-with-icon">
                        <input
                            type="text"
                            name="idNumber"
                            placeholder="Enter your ID Number"
                            value={formData.idNumber}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                            pattern="[0-9]{13}"
                            title="ID Number must be exactly 13 digits"
                        />
                    </div>
                    {idNumberError ? (
                        <div className="error-message">{idNumberError}</div>
                    ) : (
                        <div className="form-hint">South African ID Number (13 digits)</div>
                    )}
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <input
                            type={showPassword ? "text" : "password"}
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
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </button>
                    </div>
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
                PaperProps={{
                    style: {
                        borderRadius: '16px',
                        padding: '10px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.05)',
                        maxWidth: '450px',
                        width: '100%',
                        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                        border: '1px solid rgba(14, 70, 73, 0.05)',
                        overflow: 'hidden'
                    }
                }}
            >
                <div style={{
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                    marginBottom: '15px'
                }}></div>

                <DialogTitle style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    padding: '10px 24px'
                }}>
                    Verify Your Email
                </DialogTitle>

                <DialogContent style={{ padding: '20px 24px' }}>
                    <p style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        fontSize: '1.05rem',
                        color: '#555'
                    }}>
                        Please enter the verification code sent to your email.
                    </p>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Verification Code"
                        type="text"
                        fullWidth
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        disabled={isSubmitting}
                        InputProps={{
                            style: {
                                borderRadius: '12px',
                                padding: '5px 15px',
                                fontSize: '1.1rem',
                                letterSpacing: '2px'
                            }
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
                                animation: 'fadeIn 0.5s ease-out'
                            }}
                        >
                            {loginError}
                        </Alert>
                    )}
                </DialogContent>

                <DialogActions style={{
                    padding: '15px 24px 24px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Button
                        onClick={handleResendCode}
                        disabled={isSubmitting}
                        style={{
                            color: 'var(--color-secondary)',
                            fontWeight: '500',
                            textTransform: 'none',
                            fontSize: '0.95rem'
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
                                fontSize: '0.95rem'
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleVerificationSubmit}
                            disabled={isSubmitting}
                            variant="contained"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                color: 'white',
                                borderRadius: '10px',
                                padding: '8px 24px',
                                boxShadow: '0 4px 12px rgba(14, 70, 73, 0.2)',
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                fontWeight: '600'
                            }}
                        >
                            {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Verify'}
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginForm;
