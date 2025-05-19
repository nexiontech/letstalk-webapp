/*src/components/NavigationBar.jsx*/

import React, { useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../translations';
import LanguageSelector from './LanguageSelector';
import letsTalkLogo from '../assets/images/lets-talk-logo.png';
import './NavigationBar.css';

function NavigationBar() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(currentLanguage);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const authControls = document.querySelector(".auth-controls");

    function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Clone auth controls into mobile menu if not already there
      if (navMenu.classList.contains("active") && !navMenu.querySelector(".auth-controls")) {
        const authControlsClone = authControls.cloneNode(true);
        navMenu.appendChild(authControlsClone);

        // Add event listeners to cloned buttons
        const logoutBtn = authControlsClone.querySelector(".logout-btn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", handleLogout);
        }
      }
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
  }, [handleLogout]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src={letsTalkLogo} alt="Let's Talk Logo" className="logo-image" />
          </Link>

          <ul className="nav-menu">
            {/* Always visible links */}
            <li className="nav-item">
              <Link to="/press-releases" className="nav-link">{t('nav.pressReleases')}</Link>
            </li>

            {/* Links visible only when authenticated */}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/service-issues" className="nav-link">{t('nav.serviceIssues')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/services" className="nav-link">{t('nav.governmentServices')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/CommunityHub" className="nav-link">{t('nav.communityHub')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">{t('nav.dashboard')}</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="nav-right">
          {/* Authentication links */}
          <div className="auth-controls">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="nav-link login-btn">{t('nav.login')}</Link>
                <Link to="/register" className="nav-link signup-btn">{t('nav.signup')}</Link>
              </>
            ) : (
              <>
                <span className="nav-link user-greeting">Hello, {user?.name || 'User'}</span>
                <button onClick={handleLogout} className="nav-link logout-btn">{t('nav.logout')}</button>
              </>
            )}
          </div>

          {/* Language selector moved to the far right */}
          <div className="language-control">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={changeLanguage}
            />
          </div>
        </div>

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
