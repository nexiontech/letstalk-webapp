import React from 'react';
import Container from '@mui/material/Container';
// import locationIcon from '/src/assets/images/location_icon.png';
import './ReportIssuePage.css';

const ReportIssuePage = () => {
  return (
    <Container maxWidth="md" className="report-issue-page-container">
      <h1 className="report-issue-title">Report An Issue</h1>

      <div className="form-card">
        <div className="absolute top-[-1.5rem] left-[-1.5rem] w-[calc(100%+3rem)] h-[calc(100%+3rem)] opacity-25 rounded-[3rem] border border-black bg-[#00FF6805] -z-10"></div>

        <div className="form-content">
          <div className="location-section">
            <input type="checkbox" id="useLocation" className="mr-2" />
            <label htmlFor="useLocation" className="location-label">
              Use Current Location? If not your location, Enter The Address Below
            </label>
          </div>

          <div className="input-group">
            <div className="relative flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Your Location"
                  className="location-input with-icon"
                />
                {/* <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <img src={locationIcon} alt="Location Icon" className="location-icon-inner" />
                </div> */}
              </div>
            </div>
            <button className="search-button">Search</button>
          </div>

          <div className="form-group">
            <label htmlFor="issueType" className="form-label">
              What issue are you reporting
            </label>
            <div className="relative">
              <select id="issueType" >
                <option>Power Outage</option>
                <option>Burst Pipe/Water Leak</option>
                <option>Water Outage</option>
              </select>
             
            </div>
          </div>

          <div className="button-group">
            <button className="cancel-button">Cancel</button>
            <button className="submit-button">Report Issue</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReportIssuePage;