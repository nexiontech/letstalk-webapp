/*src/components/RegisterForm.jsx*/
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { registerUser, confirmRegistration, resendVerificationCode, clearRegistrationStatus, clearError } from '../services/amplifyAuthService';
import { validateEmail, validatePassword, validateIdNumber, doPasswordsMatch } from '../utils/authUtils';
import './AuthForms.css';

function RegisterForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showVerificationDialog, setShowVerificationDialog] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [unverifiedUser, setUnverifiedUser] = useState(null);

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

        // Validate ID Number
        if (!validateIdNumber(formData.idNumber)) {
            errors.idNumber = 'Please enter a valid 13-digit South African ID number';
        }

        // Validate Name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        // Validate Email
        if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate Password
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
                // Registration successful, show verification dialog
                setUnverifiedUser(formData.idNumber);
                setShowVerificationDialog(true);
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
            await dispatch(resendVerificationCode(unverifiedUser));
            alert('Verification code has been resent to your email.');
        } catch (error) {
            console.error('Resend code error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="ID Number"
                        value={formData.idNumber}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    {validationErrors.idNumber && (
                        <div className="error-message">{validationErrors.idNumber}</div>
                    )}
                    <div className="form-hint">South African ID Number (13 digits)</div>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    {validationErrors.name && (
                        <div className="error-message">{validationErrors.name}</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    {validationErrors.email && (
                        <div className="error-message">{validationErrors.email}</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    {validationErrors.password && (
                        <div className="error-message">{validationErrors.password}</div>
                    )}
                    <div className="form-hint">Minimum 8 characters with letters, numbers & symbols</div>
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                    {validationErrors.confirmPassword && (
                        <div className="error-message">{validationErrors.confirmPassword}</div>
                    )}
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
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
            <Dialog open={showVerificationDialog} onClose={() => !isSubmitting && setShowVerificationDialog(false)}>
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
                        error={!!validationErrors.verificationCode}
                        helperText={validationErrors.verificationCode}
                    />
                    {error && (
                        <Alert severity="error" className="auth-alert" style={{ marginTop: '10px' }}>
                            {error}
                        </Alert>
                    )}
                    {verificationSuccess && (
                        <Alert severity="success" className="auth-alert" style={{ marginTop: '10px' }}>
                            Email verified successfully! Redirecting to login...
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleResendCode} disabled={isSubmitting}>
                        Resend Code
                    </Button>
                    <Button onClick={() => setShowVerificationDialog(false)} disabled={isSubmitting || verificationSuccess}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleVerificationSubmit}
                        disabled={isSubmitting || verificationSuccess}
                        variant="contained"
                        color="primary"
                    >
                        {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Verify'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RegisterForm;