// src/pages/DashboardPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './DashboardPage.css';
import alertsIcon from '../assets/images/alerts_icon.png';
import payBillsIcon from '../assets/images/pay_bills_icon.png';

const DashboardPage = () => {
  const { user } = useAuth();
  const userName = user?.name || 'User';
  const navigate = useNavigate();

  const handlePayBillsClick = () => {
    navigate('/services');
  };

  const handleAlertsClick = () => {
    navigate('/service-issues');
  };

  return (
    <>
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
            <p className="card-text">Pay for government services, utilities, rates, and other municipal accounts.</p>
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
    </>
  );
};

export default DashboardPage;