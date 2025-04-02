import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForms.css';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic here
    };

    return (
        <div className="auth-form-container">
            <h1>Forgot Password?</h1>
            <p className="subtitle">Password Reset Link Will Be Sent Via E-Mail</p>
            
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>

                <p className="auth-link">
                    <Link to="/login">Back to Log In</Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;