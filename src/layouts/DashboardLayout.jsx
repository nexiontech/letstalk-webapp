// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faExclamationTriangle,
  faCreditCard,
  faUsers,
  faQuestionCircle,
  faSignOutAlt,
  faMapMarkerAlt,
  faSearch,
  faBars,
  faTimes,
  faUser,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = user?.name || 'User';
  const hasRealName = user?.name && user.name !== 'User' && user.name.trim() !== '';
  // Get first letter of first name for avatar
  const userInitial = hasRealName ? userName.split(' ')[0].charAt(0).toUpperCase() : 'U';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Log user info for debugging
  useEffect(() => {
    console.log('DashboardLayout - Auth state:', { user, isAuthenticated, hasRealName });
  }, [user, isAuthenticated, hasRealName]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Determine which nav link is active based on current path
  const isActive = (path) => {
    if (Array.isArray(path)) {
      return path.some(p => location.pathname === p) ? 'active current' : '';
    }
    return location.pathname === path ? 'active current' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items configuration
  const navItems = [
    {
      path: '/dashboard',
      icon: faTachometerAlt,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard')
    },
    {
      path: '/service-issues',
      icon: faExclamationTriangle,
      label: 'Service Issues',
      onClick: () => navigate('/service-issues')
    },
    {
      path: ['/services', '/utilities'],
      icon: faCreditCard,
      label: 'Pay Bills',
      onClick: () => navigate('/services')
    },
    {
      path: '/CommunityHub',
      icon: faUsers,
      label: 'Community Hub',
      onClick: () => navigate('/CommunityHub')
    }
  ];

  // Footer navigation items
  const footerNavItems = [
    {
      icon: faUser,
      label: 'My Profile',
      onClick: () => navigate('/profile')
    },
    {
      icon: faQuestionCircle,
      label: 'Help',
      onClick: () => {
        // Handle help action
        console.log('Help clicked');
      }
    },
    {
      icon: faSignOutAlt,
      label: 'Log Out',
      className: 'logout',
      onClick: handleLogout
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Mobile menu toggle button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="dashboard-heading">LetsTalk</h2>
          <div className="sidebar-close-mobile" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div
          className="user-profile-section"
          onClick={() => {
            navigate('/profile');
            if (mobileMenuOpen) setMobileMenuOpen(false);
          }}
          style={{ cursor: 'pointer' }}
          title="View and edit your profile"
        >
          <div className="user-avatar">
            {userInitial}
          </div>
          <div className="user-info">
            <div className="user-name">{hasRealName ? userName : 'User'}</div>
            {user?.idNumber && (
              <div className="user-id-number">
                ID: {user.idNumber.replace(/(\d{6})(\d{4})(\d{3})/, '$1 $2 $3')}
              </div>
            )}
          </div>
          <FontAwesomeIcon icon={faCog} className="profile-edit-icon" />
        </div>

        <div className="location-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="location-input"
          />
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
        </div>

        <nav className="dashboard-nav">
          <div className="nav-section">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={Array.isArray(item.path) ? item.path[0] : item.path}
                className={`nav-link ${isActive(item.path)}`}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                }}
              >
                <div className="nav-icon-container">
                  <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                </div>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="nav-section footer">
            {footerNavItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`nav-link ${item.className || ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                }}
              >
                <div className="nav-icon-container">
                  <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                </div>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-main-content">
        {children}
      </main>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </div>
  );
};

export default DashboardLayout;
