/*src/components/LoginForm.jsx*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForms.css';

function LoginForm({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: '',
        rememberMe: false,
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic 
        setIsAuthenticated(true);
        navigate('/dashboard');
    };
    const handleGoogleSignIn = () => {
        // Simulate Google sign-in
        setIsAuthenticated(true);
        navigate('/dashboard');
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

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="Enter your ID N.O"
                        value={formData.idNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-options">
                    <label className="remember-me">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        Remember Me
                    </label>
                    <Link to="/forgot-password" className="forgot-password">
                        Forgot password?
                    </Link>
                </div>

                <button type="submit" className="submit-button">
                    Sign in
                </button>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
               type="button"
                className="google-sso flex items-center"
                onClick={handleGoogleSignIn}
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
