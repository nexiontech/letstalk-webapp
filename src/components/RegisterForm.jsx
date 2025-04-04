import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForms.css';

function RegisterForm() {
    const [formData, setFormData] = useState({
        idNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false); // State for OTP popup visibility
    const [otp, setOtp] = useState(''); // State for OTP input

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Simulate sending OTP and show popup
        console.log('Simulating OTP send for:', formData.email); // Replace with actual API call
        setShowOtpPopup(true);
        // setSuccessMessage('Registration Successful...'); // Move this to OTP verification
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value); // Basic OTP handling, can be enhanced for 6 digits
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Simulate OTP verification
        console.log('Verifying OTP:', otp); // Replace with actual API call
        if (otp === '123456') { // Replace with actual verification logic
            setSuccessMessage('Registration Successful!');
            setShowOtpPopup(false);
            setOtp(''); // Clear OTP input
        } else {
            alert('Invalid OTP. Please try again.');
            // Optionally clear OTP input or provide feedback
            setOtp('');
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
            
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="ID Number"
                        value={formData.idNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Create Account
                </button>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </form>

            {/* OTP Popup */}
            {showOtpPopup && (
                <div className="otp-popup-overlay">
                    <div className="otp-popup">
                        <h3>Enter Your 6 Digit OTP Code Sent To Your Email</h3>
                        <p>Did Not Receive OTP Code? <button className="link-button">Resend OTP</button></p> {/* Add Resend logic later */}
                        <form onSubmit={handleOtpSubmit}>
                            {/* Basic OTP input, enhance later for individual boxes */}
                            <input
                                type="text"
                                name="otp"
                                placeholder="------"
                                value={otp}
                                onChange={handleOtpChange}
                                maxLength="6"
                                required
                                className="otp-input"
                            />
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegisterForm;