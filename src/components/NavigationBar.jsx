/*src/components/NavigationBar.jsx*/

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }

    hamburger.addEventListener("click", mobileMenu);

    const navLink = document.querySelectorAll(".nav-link");

    function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    return () => {
      hamburger.removeEventListener("click", mobileMenu);
      navLink.forEach(n => n.removeEventListener("click", closeMenu));
    };
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-logo">Let's Talk</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/service-issues" className="nav-link">Service Issues</Link>
          </li>
          <li className="nav-item">
            <Link to="/press-releases" className="nav-link">Press Releases</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">Government Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/CommunityHub" className="nav-link">Community Hub</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link login-btn">Log In</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link signup-btn">Sign Up</Link>
          </li>
        </ul>
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;
