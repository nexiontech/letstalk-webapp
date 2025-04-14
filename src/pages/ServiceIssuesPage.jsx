import React from 'react';
import Container from '@mui/material/Container';
import waterIcon from '../assets/images/water_icon.jpg';
import refusalIcon from '../assets/images/refusal_icon.jpg';
import powerIcon from '../assets/images/power_icon.jpg';
import waterLeakIcon from '../assets/images/water_leak_icon.jpeg';
import './ServiceIssuesPage.css';

const ServiceIssuesPage = () => {
  const issues = [
    {
      location: "Johannesburg, Alexandra",
      icon: waterIcon,
      title: "Water Outage",
      reported: "4H27 ago",
      eta: "16:30",
    },
    {
      location: "Johannesburg, Alexandra",
      icon: refusalIcon,
      title: "Refuse Not Collected",
      reported: "1H21 ago",
      eta: "27 March 2025",
    },
    {
      location: "Johannesburg, Alexandra",
      icon: powerIcon,
      title: "Power Outage",
      reported: "27 Min ago",
      eta: "20:00",
    },
    {
      location: "Johannesburg, Alexandra",
      icon: waterLeakIcon,
      title: "Water Leak",
      reported: "Yesterday (16:00)",
      eta: "Today (17:00)",
    },
  ];

  return (
    <Container maxWidth="1400px" className="main-container">
      <div className="content-wrapper">
        <h1 className="service-issues-title">Service Issues</h1>

        <div className="map-section">
          <iframe
            src="https://maps.google.com/maps?q=Johannesburg&z=13&output=embed"
            className="map-iframe"
            allowFullScreen
            title="Google Map" 
          />
         
        </div>

        <div className="issues-sidebar">
          <h2 className="sidebar-header">Reported Issues In the Area</h2>

          <div className="filter-buttons">
            <button className="filter-btn active">My Town</button>
            <button className="filter-btn">Nearby</button>
            <button className="filter-btn">Latest</button>
          </div>

          <div className="issues-list">
            {issues.map((issue, index) => (
              <div key={index} className="issue-card">
                <p className="issue-location">{issue.location}</p>
                <div className="issue-content">
                  <img src={issue.icon} alt={issue.title} className="issue-icon" />
                  <div>
                    <h3 className="issue-title">{issue.title}</h3>
                    <p className="issue-details">
                      Reported: {issue.reported}<br />
                      ETA: {issue.eta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="report-button">Report An Issue</button>
        </div>
      </div>
    
    </Container>
  );
};

export default ServiceIssuesPage;