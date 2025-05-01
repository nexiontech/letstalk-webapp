/*src/components/ApiLoginForm.jsx*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAuth } from '../contexts/ApiAuthContext';
import { Alert, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import './AuthForms.css';

function ApiLoginForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [idNumberError, setIdNumberError] = useState(null);

    const navigate = useNavigate();
    const { login, isAuthenticated, error, clearAuthError } = useApiAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Clear any previous errors when component mounts
    useEffect(() => {
        clearAuthError();
    }, [clearAuthError]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Clear ID number error when user types
        if (name === 'idNumber') {
            setIdNumberError(null);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateIdNumber = (idNumber) => {
        const idRegex = /^\d{13}$/;
        if (!idRegex.test(idNumber)) {
            setIdNumberError('ID Number must be exactly 13 digits');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoginError(null);

        // Validate ID number
        if (!validateIdNumber(formData.idNumber)) {
            setIsSubmitting(false);
            return;
        }

        try {
            // Call the login function from our API auth context
            const result = await login(formData.idNumber, formData.password);

            if (result.success) {
                // Login successful, will redirect via the useEffect above
                console.log('Login successful via API Gateway');
            } else {
                // Login failed
                setLoginError(result.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Sign in to Let's Talk</h2>
                    <p>Enter your credentials to access your account</p>
                </div>

                {loginError && (
                    <Alert severity="error" className="auth-alert">
                        {loginError}
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
                            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
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
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                tabIndex="-1"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
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
                            'Sign in with API Gateway'
                        )}
                    </button>

                    <p className="auth-link">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ApiLoginForm;
