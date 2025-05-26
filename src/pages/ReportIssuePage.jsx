import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportIssuePage.css';

const ReportIssuePage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/service-issues');
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    alert('Issue reported successfully!');
    navigate('/service-issues');
  };

  return (
    <div className="report-issue-container">
      <h1 className="report-issue-title">Report An Issue</h1>

      <div className="form-card">
        <div className="form-content">
          <div className="location-section">
            <input type="checkbox" id="useLocation" />
            <label htmlFor="useLocation" className="location-label">
              Use Current Location? If not, enter the address below
            </label>
          </div>

          <div className="input-group">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter Your Location"
                className="location-input"
              />
            </div>
            <button className="search-button">Search</button>
          </div>

          <div className="form-group">
            <label htmlFor="issueType" className="form-label">
              What issue are you reporting?
            </label>
            <div className="relative">
              <select id="issueType">
                <option value="">Select an issue type</option>
                <option value="power">Power Outage</option>
                <option value="water-leak">Burst Pipe/Water Leak</option>
                <option value="water">Water Outage</option>
                <option value="refuse">Refuse Not Collected</option>
                <option value="road">Road Damage</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;
