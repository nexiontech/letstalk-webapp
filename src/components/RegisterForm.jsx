/*src/components/RegisterForm.jsx*/
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { registerUser, confirmRegistration, resendVerificationCode, clearRegistrationStatus, clearError } from '../services/amplifyAuthService';
import { validateEmail, validatePassword, validateIdNumber, doPasswordsMatch } from '../utils/authUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faIdCard, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './AuthForms.css';

function RegisterForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showVerificationDialog, setShowVerificationDialog] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [unverifiedUser, setUnverifiedUser] = useState(null);
    const [resendSuccess, setResendSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get auth state from Redux
    const {
        loading,
        error,
        registrationSuccess,
        registrationMessage,
        verificationSuccess
    } = useSelector(state => state.auth);

    // Clear errors when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearRegistrationStatus());
        };
    }, [dispatch]);

    // If verification is successful, redirect to login
    useEffect(() => {
        if (verificationSuccess) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [verificationSuccess, navigate]);

    const validateForm = () => {
        const errors = {};

        // Validate ID Number with more detailed feedback
        if (!formData.idNumber) {
            errors.idNumber = 'ID Number is required';
        } else if (formData.idNumber.length !== 13) {
            errors.idNumber = 'ID Number must be exactly 13 digits';
        } else if (!/^\d+$/.test(formData.idNumber)) {
            errors.idNumber = 'ID Number must contain only digits';
        } else if (!validateIdNumber(formData.idNumber)) {
            errors.idNumber = 'Please enter a valid South African ID number';
        }

        // Validate Name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        // Validate Email with more detailed feedback
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate Password with more detailed feedback
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.errors[0];
        }

        // Validate Password Match
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

        try {
            const resultAction = await dispatch(registerUser({
                idNumber: formData.idNumber,
                name: formData.name,
                email: formData.email,
                password: formData.password
            }));

            if (registerUser.fulfilled.match(resultAction)) {
                // Log the identity pool association status
                if (resultAction.payload.identityPoolAssociation) {
                    console.log('User successfully associated with Identity Pool');
                }

                // Registration successful, show verification dialog
                setUnverifiedUser(formData.idNumber);
                setShowVerificationDialog(true);

                // Clear the form data for security
                setFormData({
                    idNumber: formData.idNumber, // Keep ID number for verification
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationSubmit = async () => {
        if (!verificationCode.trim()) {
            setValidationErrors({ verificationCode: 'Please enter the verification code' });
            return;
        }

        setIsSubmitting(true);
        setValidationErrors({});

        try {
            await dispatch(confirmRegistration({
                idNumber: unverifiedUser,
                code: verificationCode
            }));
        } catch (error) {
            console.error('Verification error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        if (!unverifiedUser) return;

        setIsSubmitting(true);

        try {
            // Use ID Number for resending verification code
            const resultAction = await dispatch(resendVerificationCode(unverifiedUser));

            if (resendVerificationCode.fulfilled.match(resultAction)) {
                // Show success message in the dialog instead of an alert
                setResendSuccess(true);

                // Hide the success message after 5 seconds
                setTimeout(() => {
                    setResendSuccess(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Resend code error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'idNumber') {
            // Only allow digits and limit to 13 characters
            const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 13);
            setFormData(prev => ({
                ...prev,
                [name]: sanitizedValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="auth-form-container">
            <h1>Create An Account</h1>
            <p className="subtitle">Please enter your details.</p>

            {/* Show success message */}
            {registrationSuccess && registrationMessage && (
                <Alert severity="success" className="auth-alert">
                    {registrationMessage}
                </Alert>
            )}

            {/* Show error message */}
            {error && (
                <Alert severity="error" className="auth-alert">
                    {error}
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
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                        />
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
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                        />
                    </div>
                    {validationErrors.email && (
                        <div className="error-message">{validationErrors.email}</div>
                    )}
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
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
                    {validationErrors.password && (
                        <div className="error-message">{validationErrors.password}</div>
                    )}
                    <div className="form-hint">Minimum 8 characters with letters, numbers & symbols</div>
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={toggleConfirmPasswordVisibility}
                            tabIndex="-1"
                        >
                            <span className="password-toggle-text">
                                {showConfirmPassword ? "Hide" : "Show"}
                            </span>
                        </button>
                    </div>
                    {validationErrors.confirmPassword && (
                        <div className="error-message">{validationErrors.confirmPassword}</div>
                    )}
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting} style={{ color: 'white' }}>
                    {isSubmitting ? (
                        <>
                            <CircularProgress size={20} color="inherit" />
                            <span style={{ marginLeft: '8px' }}>Creating Account...</span>
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </form>

            {/* Email Verification Dialog */}
            <Dialog
                open={showVerificationDialog}
                onClose={() => !isSubmitting && setShowVerificationDialog(false)}
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
                        error={!!validationErrors.verificationCode}
                        helperText={validationErrors.verificationCode}
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

                    {error && (
                        <Alert
                            severity="error"
                            className="auth-alert"
                            style={{
                                marginTop: '15px',
                                borderRadius: '12px',
                                animation: 'fadeIn 0.5s ease-out'
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {resendSuccess && (
                        <Alert
                            severity="info"
                            className="auth-alert"
                            style={{
                                marginTop: '15px',
                                borderRadius: '12px',
                                animation: 'fadeIn 0.5s ease-out'
                            }}
                        >
                            Verification code has been resent to your email.
                        </Alert>
                    )}

                    {verificationSuccess && (
                        <Alert
                            severity="success"
                            className="auth-alert"
                            style={{
                                marginTop: '15px',
                                borderRadius: '12px',
                                animation: 'fadeIn 0.5s ease-out'
                            }}
                        >
                            Email verified successfully! Redirecting to login...
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
                            disabled={isSubmitting || verificationSuccess}
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
                            disabled={isSubmitting || verificationSuccess}
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

export default RegisterForm;