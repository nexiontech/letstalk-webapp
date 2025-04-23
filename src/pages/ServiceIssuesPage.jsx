import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWater, faTrash, faBolt, faWrench, faMapMarkerAlt,
  faCalendarAlt, faClock, faExclamationTriangle, faFilter,
  faSearch, faPlus, faChevronRight, faInfoCircle, faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import waterIcon from '../assets/images/water_icon.jpg';
import refusalIcon from '../assets/images/refusal_icon.jpg';
import powerIcon from '../assets/images/power_icon.jpg';
import waterLeakIcon from '../assets/images/water_leak_icon.jpeg';
import './ServiceIssuesPage.css';

const ServiceIssuesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('myTown');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const issueTypes = {
    water: { icon: faWater, color: '#3498db', bgColor: 'rgba(52, 152, 219, 0.1)' },
    refuse: { icon: faTrash, color: '#e67e22', bgColor: 'rgba(230, 126, 34, 0.1)' },
    power: { icon: faBolt, color: '#f1c40f', bgColor: 'rgba(241, 196, 15, 0.1)' },
    leak: { icon: faWrench, color: '#2ecc71', bgColor: 'rgba(46, 204, 113, 0.1)' }
  };

  const issues = [
    {
      id: 1,
      location: "Johannesburg, Alexandra",
      icon: waterIcon,
      iconType: 'water',
      title: "Water Outage",
      reported: "4H27 ago",
      eta: "16:30",
      status: "In Progress",
      severity: "High",
      affected: "~2,500 households",
      description: "Main water supply interrupted due to pipe damage. Repair crews are on site.",
      updates: [
        { time: "10:15", message: "Repair crews have arrived on site" },
        { time: "11:30", message: "Cause identified as broken main pipe" },
        { time: "13:45", message: "Repairs underway, estimated completion by 16:30" }
      ]
    },
    {
      id: 2,
      location: "Johannesburg, Alexandra",
      icon: refusalIcon,
      iconType: 'refuse',
      title: "Refuse Not Collected",
      reported: "1H21 ago",
      eta: "27 March 2025",
      status: "Scheduled",
      severity: "Medium",
      affected: "Several streets",
      description: "Regular refuse collection delayed due to vehicle maintenance issues.",
      updates: [
        { time: "09:00", message: "Issue reported to waste management" },
        { time: "10:30", message: "Collection rescheduled for tomorrow" }
      ]
    },
    {
      id: 3,
      location: "Johannesburg, Alexandra",
      icon: powerIcon,
      iconType: 'power',
      title: "Power Outage",
      reported: "27 Min ago",
      eta: "20:00",
      status: "Investigating",
      severity: "Critical",
      affected: "~5,000 households",
      description: "Widespread power outage affecting multiple blocks. Emergency teams dispatched.",
      updates: [
        { time: "14:00", message: "Outage reported and confirmed" },
        { time: "14:30", message: "Emergency response teams dispatched" }
      ]
    },
    {
      id: 4,
      location: "Johannesburg, Alexandra",
      icon: waterLeakIcon,
      iconType: 'leak',
      title: "Water Leak",
      reported: "Yesterday (16:00)",
      eta: "Today (17:00)",
      status: "Scheduled",
      severity: "Low",
      affected: "Local area",
      description: "Minor water leak from street pipe. Non-emergency repair scheduled.",
      updates: [
        { time: "16:00 (Yesterday)", message: "Leak reported and assessed" },
        { time: "09:00 (Today)", message: "Repair scheduled for this afternoon" }
      ]
    },
  ];

  const filteredIssues = issues.filter(issue => {
    // Filter by search query
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !issue.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleReportButtonClick = () => {
    navigate('/report-issue');
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return '#e74c3c';
      case 'High': return '#e67e22';
      case 'Medium': return '#f1c40f';
      case 'Low': return '#2ecc71';
      default: return '#3498db';
    }
  };

  return (
    <div className="issues-dashboard">
      <div className="issues-header">
        <div className="issues-title-section">
          <h1>Service Issues</h1>
          <p>Track and report service disruptions in your area</p>
        </div>

        <div className="issues-actions">
          <div className="issues-search">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="report-issue-btn" onClick={handleReportButtonClick}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      <div className="issues-content">
        <div className="issues-sidebar">
          <div className="filter-section">
            <div className="filter-header">
              <FontAwesomeIcon icon={faFilter} />
              <h3>Filters</h3>
            </div>

            <div className="filter-options">
              <button
                className={`filter-option ${activeFilter === 'myTown' ? 'active' : ''}`}
                onClick={() => handleFilterClick('myTown')}
              >
                My Town
              </button>
              <button
                className={`filter-option ${activeFilter === 'nearby' ? 'active' : ''}`}
                onClick={() => handleFilterClick('nearby')}
              >
                Nearby
              </button>
              <button
                className={`filter-option ${activeFilter === 'latest' ? 'active' : ''}`}
                onClick={() => handleFilterClick('latest')}
              >
                Latest
              </button>
            </div>
          </div>

          <div className="issues-list">
            <h3 className="list-title">
              <FontAwesomeIcon icon={faBullhorn} />
              <span>Reported Issues</span>
              <span className="issue-count">{filteredIssues.length}</span>
            </h3>

            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`issue-card ${selectedIssue?.id === issue.id ? 'selected' : ''}`}
                  onClick={() => handleIssueClick(issue)}
                >
                  <div className="issue-card-header">
                    <div className="issue-icon-container" style={{ backgroundColor: issueTypes[issue.iconType].bgColor }}>
                      <FontAwesomeIcon icon={issueTypes[issue.iconType].icon} style={{ color: issueTypes[issue.iconType].color }} />
                    </div>
                    <div className="issue-basic-info">
                      <h3>{issue.title}</h3>
                      <p className="issue-location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>{issue.location}</span>
                      </p>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="issue-arrow" />
                  </div>

                  <div className="issue-card-footer">
                    <div className="issue-status" style={{ backgroundColor: getSeverityColor(issue.severity) }}>
                      {issue.status}
                    </div>
                    <div className="issue-details-wrapper">
                      <div className="issue-time">
                        <FontAwesomeIcon icon={faClock} />
                        <span>Reported: {issue.reported}</span>
                      </div>
                      <div className="issue-eta">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>ETA: {issue.eta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-issues">
                <FontAwesomeIcon icon={faInfoCircle} />
                <p>No issues match your search criteria</p>
              </div>
            )}
          </div>
        </div>

        <div className="issues-main">
          {selectedIssue ? (
            <div className="issue-details-panel">
              <div className="issue-details-header">
                <div className="issue-details-title">
                  <div className="issue-icon-large" style={{ backgroundColor: issueTypes[selectedIssue.iconType].bgColor }}>
                    <FontAwesomeIcon icon={issueTypes[selectedIssue.iconType].icon} style={{ color: issueTypes[selectedIssue.iconType].color }} />
                  </div>
                  <div>
                    <h2>{selectedIssue.title}</h2>
                    <p className="issue-location-large">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <span>{selectedIssue.location}</span>
                    </p>
                  </div>
                </div>

                <div className="issue-severity" style={{ backgroundColor: getSeverityColor(selectedIssue.severity) }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <span>{selectedIssue.severity} Severity</span>
                </div>
              </div>

              <div className="issue-details-content">
                <div className="issue-info-grid">
                  <div className="info-item">
                    <h4>Status</h4>
                    <p>{selectedIssue.status}</p>
                  </div>
                  <div className="info-item">
                    <h4>Reported</h4>
                    <p>{selectedIssue.reported}</p>
                  </div>
                  <div className="info-item">
                    <h4>Estimated Resolution</h4>
                    <p>{selectedIssue.eta}</p>
                  </div>
                  <div className="info-item">
                    <h4>Affected Area</h4>
                    <p>{selectedIssue.affected}</p>
                  </div>
                </div>

                <div className="issue-description">
                  <h3>Description</h3>
                  <p>{selectedIssue.description}</p>
                </div>

                <div className="issue-updates">
                  <h3>Updates</h3>
                  <div className="updates-timeline">
                    {selectedIssue.updates.map((update, index) => (
                      <div key={index} className="update-item">
                        <div className="update-time">{update.time}</div>
                        <div className="update-message">{update.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="issue-map">
                <h3>Location</h3>
                <div className="map-container">
                  <iframe
                    src="https://maps.google.com/maps?q=Johannesburg&z=13&output=embed"
                    allowFullScreen
                    title="Issue Location"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="map-view">
              <iframe
                src="https://maps.google.com/maps?q=Johannesburg&z=13&output=embed"
                allowFullScreen
                title="Google Map"
              />
              <div className="map-overlay">
                <div className="map-info">
                  <h2>Service Issues Map</h2>
                  <p>Select an issue from the list to view details</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceIssuesPage;