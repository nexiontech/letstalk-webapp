import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <main className="home-container">
            <section className="hero-section">
                <h2 className="hero-title">Welcome to Let's Talk</h2>
                <p className="hero-subtitle">Connecting you with the services you need.</p>
                
                <div className="cta-buttons">
                    <Link to="/login" className="cta-button login">Log In</Link>
                    <Link to="/register" className="cta-button register">Register</Link>
                </div>
            </section>
        </main>
    );
}

export default HomePage;