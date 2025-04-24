// src/layouts/DashboardLayout.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import dashboardIcon from '../assets/images/dashboard_icon.png';
import serviceIssuesIcon from '../assets/images/service_issues_icon.png';
import governmentIcon from '../assets/images/government_icon.png';
import recordedIcon from '../assets/images/recorded_icon.png';
import logoutIcon from '../assets/images/logout_icon.png';
import helpIcon from '../assets/images/help_icon.png';
import locationIcon from '../assets/images/location_icon.png';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = user?.name || 'User';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Determine which nav link is active based on current path
  const isActive = (path) => {
    return location.pathname === path ? 'active current' : 'active';
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-heading">Dashboard</h2>
        <div className="location-input-container">
          <input
            type="text"
            placeholder="Enter Your Location"
            className="location-input"
          />
          <img
            src={locationIcon}
            alt="Location Icon"
            className="location-icon"
          />
        </div>
        <nav className="dashboard-nav">
          <a
            href="/dashboard"
            className={`nav-link ${isActive('/dashboard')}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
          >
            <img src={dashboardIcon} alt="Dashboard Icon" className="nav-icon" />
            <span>Dashboard</span>
          </a>
          <a
            href="/service-issues"
            className={`nav-link ${isActive('/service-issues')}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('/service-issues');
            }}
          >
            <img src={serviceIssuesIcon} alt="Service Issues Icon" className="nav-icon" />
            <span>Service Issues</span>
          </a>
          <a
            href="/services"
            className={`nav-link ${isActive('/services') || isActive('/utilities')}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('/services');
            }}
          >
            <img src={governmentIcon} alt="Government Services" className="nav-icon" />
            <span>Pay Bills</span>
          </a>
          <a
            href="/CommunityHub"
            className={`nav-link ${isActive('/CommunityHub')}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('/CommunityHub');
            }}
          >
            <img src={recordedIcon} alt="Community Hub" className="nav-icon" />
            <span>Community Hub</span>
          </a>
          <div style={{ height: '180px' }}></div>
          <a
            href="#"
            className="nav-link active"
            onClick={(e) => {
              e.preventDefault();
              // Handle help action
            }}
          >
            <img src={helpIcon} alt="Help Icon" className="nav-icon" />
            <span>Help</span>
          </a>
          <a
            href="#"
            className="nav-link logout active"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <img src={logoutIcon} alt="Log Out Icon" className="nav-icon" />
            <span>Log Out</span>
          </a>
        </nav>
      </aside>
      <main className="dashboard-main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
