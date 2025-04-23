/*src/components/NavigationBar.jsx*/

import React, { useEffect } from 'react';
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

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
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
        <Link to="/" className="nav-logo">
          <img src={letsTalkLogo} alt="Let's Talk Logo" className="logo-image" />
        </Link>
        <div className="nav-right">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={changeLanguage}
          />
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

            {/* Authentication links */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link login-btn">{t('nav.login')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link signup-btn">{t('nav.signup')}</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link user-greeting">Hello, {user?.name || 'User'}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-btn">{t('nav.logout')}</button>
                </li>
              </>
            )}
          </ul>
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
