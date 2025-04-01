import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './NavigationBar.css'; // We'll create this CSS file next

function NavigationBar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link logo">Let's Talk</Link>
            <ul className="nav-links">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/register" className="nav-link">Register</Link></li>
                <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li> {/* Link to Dashboard */}
            </ul>
        </nav>
    );
}

export default NavigationBar;