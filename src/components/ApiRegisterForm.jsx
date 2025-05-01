/*src/components/ApiRegisterForm.jsx*/
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import { useApiAuth } from '../contexts/ApiAuthContext';
import { validateEmail, validatePassword, validateIdNumber, doPasswordsMatch } from '../utils/authUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faIdCard, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './AuthForms.css';

function ApiRegisterForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [registrationError, setRegistrationError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const { register, registrationStatus, error, clearAuthError, clearAuthRegistrationStatus } = useApiAuth();

    // Clear any previous errors or registration status when component mounts
    useEffect(() => {
        clearAuthError();
        clearAuthRegistrationStatus();
    }, [clearAuthError, clearAuthRegistrationStatus]);

    // Handle registration status changes
    useEffect(() => {
        if (registrationStatus?.success) {
            setRegistrationSuccess(true);
            setSuccessMessage(registrationStatus.message);
        }
    }, [registrationStatus]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear validation errors for this field when user types
        if (validationErrors[name]) {
            setValidationErrors({
                ...validationErrors,
                [name]: null
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const errors = {};

        // Validate ID Number
        if (!validateIdNumber(formData.idNumber)) {
            errors.idNumber = 'ID Number must be exactly 13 digits';
        }

        // Validate Name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        // Validate Email
        if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate Password
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.errors[0]; // Just show the first error for simplicity
        }

        // Validate Password Confirmation
        if (!doPasswordsMatch(formData.password, formData.confirmPassword)) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setRegistrationError(null);

        try {
            const result = await register({
                idNumber: formData.idNumber,
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                setRegistrationSuccess(true);
                setSuccessMessage(result.message || 'Registration successful. Please check your email for verification.');
            } else {
                setRegistrationError(result.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setRegistrationError('An unexpected error occurred. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // If registration was successful, show success message
    if (registrationSuccess) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Registration Successful</h2>
                    </div>
                    <Alert severity="success" className="auth-alert">
                        {successMessage}
                    </Alert>
                    <div className="auth-actions">
                        <Link to="/login" className="submit-button" style={{ textDecoration: 'none', textAlign: 'center' }}>
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create an Account</h2>
                    <p>Fill in your details to get started</p>
                </div>

                {registrationError && (
                    <Alert severity="error" className="auth-alert">
                        {registrationError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="idNumber"
                                placeholder="ID Number"
                                value={formData.idNumber}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                                pattern="[0-9]{13}"
                                title="ID Number must be exactly 13 digits"
                            />
                            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                        </div>
                        {validationErrors.idNumber && (
                            <div className="error-message">{validationErrors.idNumber}</div>
                        )}
                        <div className="form-hint">South African ID Number (13 digits)</div>
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                        </div>
                        {validationErrors.name && (
                            <div className="error-message">{validationErrors.name}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        </div>
                        {validationErrors.email && (
                            <div className="error-message">{validationErrors.email}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
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
                        {validationErrors.password && (
                            <div className="error-message">{validationErrors.password}</div>
                        )}
                        <div className="form-hint">
                            Password must be at least 8 characters with uppercase, lowercase, number, and special character
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={toggleConfirmPasswordVisibility}
                                tabIndex="-1"
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {validationErrors.confirmPassword && (
                            <div className="error-message">{validationErrors.confirmPassword}</div>
                        )}
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
                                <span style={{ marginLeft: '8px' }}>Creating Account...</span>
                            </>
                        ) : (
                            'Create Account with API Gateway'
                        )}
                    </button>

                    <p className="auth-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ApiRegisterForm;
