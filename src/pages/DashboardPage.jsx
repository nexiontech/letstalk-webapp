// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCreditCard,
  faWater,
  faBolt,
  faHome,
  faCalendarAlt,
  faExclamationTriangle,
  faChevronRight,
  faSearch,
  faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';
import WeatherWidget from '../components/weather/WeatherWidget';
import useWeather from '../hooks/useWeather';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const fullName = user?.name || 'User';
  const firstName = fullName.split(' ')[0]; // Extract just the first name
  const hasRealName = user?.name && user.name !== 'User' && user.name.trim() !== '';
  const navigate = useNavigate();

  // Log user info for debugging
  useEffect(() => {
    console.log('Dashboard - Auth state:', { user, isAuthenticated, hasRealName });
  }, [user, isAuthenticated, hasRealName]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Use the weather hook to fetch and manage weather data
  const {
    weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    refreshWeather
  } = useWeather();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get a random South African greeting (Howzit or Eita)
  const getGreeting = () => {
    const greetings = ['Howzit', 'Eita'];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  // Format date
  const formattedDate = currentTime.toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Navigation handlers
  const handlePayBillsClick = () => {
    navigate('/services');
  };

  const handleAlertsClick = () => {
    navigate('/service-issues');
  };

  const handleCommunityHubClick = () => {
    navigate('/CommunityHub');
  };

  // Mock data for quick stats
  const quickStats = [
    {
      id: 'electricity',
      icon: faBolt,
      title: 'Electricity',
      value: 'R 750.25',
      status: 'Due in 5 days',
      color: '#FFB61D'
    },
    {
      id: 'water',
      icon: faWater,
      title: 'Water & Sanitation',
      value: 'R 420.80',
      status: 'Due in 8 days',
      color: '#0E4649'
    },
    {
      id: 'property',
      icon: faHome,
      title: 'Property Rates',
      value: 'R 1,250.00',
      status: 'Paid',
      color: '#2E8B57'
    }
  ];

  // Mock data for recent alerts
  const recentAlerts = [
    {
      id: 1,
      title: 'Scheduled Water Maintenance',
      description: 'Water supply will be interrupted on June 15th from 09:00 to 14:00 in your area.',
      date: '10 June 2025',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Power Outage Alert',
      description: 'Planned power outage for maintenance on June 18th from 22:00 to 05:00.',
      date: '12 June 2025',
      priority: 'high'
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Meeting',
      date: '20 June 2025',
      time: '18:00',
      location: 'Town Hall'
    },
    {
      id: 2,
      title: 'Public Participation Forum',
      date: '25 June 2025',
      time: '10:00',
      location: 'Civic Center'
    }
  ];

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="greeting-container">
          <h1 className="greeting-heading">
            {getGreeting()}{hasRealName ? `, ${firstName}` : ''}
          </h1>
          <p className="date-display">{formattedDate}</p>
        </div>
        <WeatherWidget
          weatherData={weatherData}
          isLoading={isWeatherLoading}
          error={weatherError}
          onRefresh={refreshWeather}
          className="dashboard-weather-widget"
        />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <div className="action-card primary" onClick={handlePayBillsClick}>
              <FontAwesomeIcon icon={faCreditCard} className="action-icon" />
              <h3>Pay Bills</h3>
              <p>Pay utilities, rates & services</p>
              <FontAwesomeIcon icon={faChevronRight} className="action-arrow" />
            </div>
            <div className="action-card secondary" onClick={handleAlertsClick}>
              <FontAwesomeIcon icon={faBell} className="action-icon" />
              <h3>Service Alerts</h3>
              <p>View service disruptions & notices</p>
              <FontAwesomeIcon icon={faChevronRight} className="action-arrow" />
            </div>
            <div className="action-card tertiary" onClick={handleCommunityHubClick}>
              <FontAwesomeIcon icon={faCalendarAlt} className="action-icon" />
              <h3>Community Hub</h3>
              <p>Access community resources & events</p>
              <FontAwesomeIcon icon={faChevronRight} className="action-arrow" />
            </div>
            <div className="action-card quaternary" onClick={() => navigate('/services')}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="action-icon" />
              <h3>My Accounts</h3>
              <p>View account statements & history</p>
              <FontAwesomeIcon icon={faChevronRight} className="action-arrow" />
            </div>
          </div>
        </section>

        <div className="dashboard-two-columns">
          {/* Quick Stats */}
          <section className="quick-stats-section">
            <div className="section-header">
              <h2 className="section-title">Account Summary</h2>
              <button className="view-all-button" onClick={handlePayBillsClick}>
                View All <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className="stats-container">
              {quickStats.map(stat => (
                <div className="stat-card" key={stat.id}>
                  <div className="stat-icon-container" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                    <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
                  </div>
                  <div className="stat-details">
                    <h3 className="stat-title">{stat.title}</h3>
                    <p className="stat-value">{stat.value}</p>
                    <p className={`stat-status ${stat.status === 'Paid' ? 'status-paid' : 'status-due'}`}>
                      {stat.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Alerts */}
          <section className="recent-alerts-section">
            <div className="section-header">
              <h2 className="section-title">Recent Alerts</h2>
              <button className="view-all-button" onClick={handleAlertsClick}>
                View All <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className="alerts-container">
              {recentAlerts.map(alert => (
                <div className={`alert-card priority-${alert.priority}`} key={alert.id}>
                  <div className="alert-header">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="alert-icon" />
                    <h3 className="alert-title">{alert.title}</h3>
                  </div>
                  <p className="alert-description">{alert.description}</p>
                  <div className="alert-footer">
                    <span className="alert-date">{alert.date}</span>
                    <button className="alert-action" onClick={handleAlertsClick}>
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Map and Events Section */}
        <div className="map-events-container">
          {/* Map Section */}
          <section className="map-section">
            <div className="section-header">
              <h2 className="section-title">Your Area</h2>
              <div className="map-search">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="Search location..." />
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=Johannesburg&z=13&output=embed"
                title="Area Map"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Events Section */}
          <section className="events-section">
            <div className="section-header">
              <h2 className="section-title">Upcoming Events</h2>
              <button className="view-all-button" onClick={handleCommunityHubClick}>
                View All <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className="events-list">
              {upcomingEvents.map(event => (
                <div className="event-item" key={event.id}>
                  <div className="event-date">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.time} • {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;