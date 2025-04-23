// src/pages/DashboardPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import dashboardIcon from '../assets/images/dashboard_icon.png';
import serviceIssuesIcon from '../assets/images/service_issues_icon.png';
import governmentIcon from '../assets/images/government_icon.png';
import recordedIcon from '../assets/images/recorded_icon.png';
import logoutIcon from '../assets/images/logout_icon.png';
import alertsIcon from '../assets/images/alerts_icon.png';
import payBillsIcon from '../assets/images/pay_bills_icon.png';
import locationIcon from '../assets/images/location_icon.png';
import aiIcon from '../assets/images/ai_icon.png';
import helpIcon from '../assets/images/help_icon.png';
import Container from '@mui/material/Container';


const DashboardPage = () => {
  const userName = 'User';
  const navigate = useNavigate();

  const handlePayBillsClick = () => {
    navigate('/utilities');
  };

  const handleAlertsClick = () => {
    navigate('/service-issues');
  };
  const handleAIClick = () => {
    navigate('/thusong-ai');
  };
  return (
    <Container maxWidth="xl"> {/* Wrap in Container */}
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
            <a href="#" className="nav-link active">
              <img src={dashboardIcon} alt="Dashboard Icon" className="nav-icon" />
              <span>Dashboard</span>
            </a>
            <a href="service-issues" className="nav-link active">
              <img src={serviceIssuesIcon} alt="Service Issues Icon" className="nav-icon" />
              <span>Service Issues</span>
            </a>
            <a href="#" className="nav-link active">
              <img src={governmentIcon} alt="Government Icon" className="nav-icon" />
              <span>Government</span>
            </a>
            <a href="thusong-ai" className="nav-link active">
              <img src={aiIcon} alt="Thusong AI Icon" className="nav-icon" />
              <span>Thusong AI</span>
            </a>
            <a href="#" className="nav-link active">
              <img src={recordedIcon} alt="Recorded Icon" className="nav-icon" />
              <span>Recorded</span>
            </a>
            <div style={{ height: '180px' }}></div>
            <a href="#" className="nav-link active">
              <img src={helpIcon} alt="Help Icon" className="nav-icon" />
              <span>Help</span>
            </a>
            <a href="#" className="nav-link logout active">
              <img src={logoutIcon} alt="Log Out Icon" className="nav-icon" />
              <span>Log Out</span>
            </a>
          </nav>
        </aside>
        <main className="dashboard-main-content">
          <div className="greeting-section">
            <h1 className="greeting-heading">Good Day, {userName}</h1>
          </div>
          <div className="dashboard-cards-map-container">
            <div className="dashboard-cards">
              <div className="dashboard-card clickable" onClick={handleAlertsClick}>
                <div className="card-header">
                  <img src={alertsIcon} alt="Alerts Icon" className="card-icon" />
                  <h2 className="card-title">Alerts</h2>
                </div>
                <p className="card-text">Your alerts would be displayed here.</p>
              </div>
              <div className="dashboard-card clickable" onClick={handlePayBillsClick}>
                <div className="card-header">
                  <img src={payBillsIcon} alt="Pay Bills Icon" className="card-icon" />
                  <h2 className="card-title">Pay Bills Now</h2>
                </div>
                <p className="card-text">View/Pay your Electricity, Water, Rent, or Retire Balance.</p>
              </div>
            </div>
            <div className="dashboard-map">
              <iframe
                src="https://maps.google.com/maps?q=Johannesburg&z=13&output=embed"
                width="100%"
                height="100%"
                style={{ border: '0' }}
                allowFullScreen
              ></iframe>
              <button className="change-location-button">Change Location</button>
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
};

export default DashboardPage;