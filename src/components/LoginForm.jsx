/*src/components/LoginForm.jsx*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, CircularProgress } from '@mui/material';
import './AuthForms.css';

function LoginForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: '',
        rememberMe: false,
    });
    const [loginError, setLoginError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoginError(null);

        try {
            // Call the login function from our auth context
            const result = await login(formData.idNumber, formData.password);

            if (result.success) {
                // Login successful, will redirect via the useEffect above
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

    const handleGoogleSignIn = () => {
        // In a real implementation, this would integrate with AWS Cognito's federated identity
        alert('Google Sign-In is not implemented in this demo.');
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
                        placeholder="Enter your ID N.O"
                        value={formData.idNumber}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    <div className="form-hint">Dummy ID: 7208145695082</div>
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
                    <div className="form-hint">Dummy Password: P@ssword</div>
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
            </form>
        </div>
    );
}

export default LoginForm;
