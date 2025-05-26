// src/components/IdNumberInfo.jsx
import React, { useState, useEffect } from 'react';
import { parseIdNumber } from '../utils/idNumberParser';
import './IdNumberInfo.css';

const IdNumberInfo = ({ idNumber }) => {
  const [idInfo, setIdInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (idNumber) {
      const parsedInfo = parseIdNumber(idNumber);
      if (parsedInfo.valid) {
        setIdInfo(parsedInfo);
        setError(null);
      } else {
        setIdInfo(null);
        setError(parsedInfo.error);
      }
    } else {
      setIdInfo(null);
      setError('ID number is required');
    }
  }, [idNumber]);

  if (error) {
    return (
      <div className="id-number-info error">
        <div className="id-number-error">
          <p>Unable to parse ID number: {error}</p>
        </div>
      </div>
    );
  }

  if (!idInfo) {
    return (
      <div className="id-number-info loading">
        <p>Loading ID information...</p>
      </div>
    );
  }

  return (
    <div className="id-number-info">
      <div className="id-info-section">
        <h3>ID Number Details</h3>
        <div className="id-info-grid">
          <div className="id-info-item">
            <span className="id-info-label">ID Number:</span>
            <span className="id-info-value">{idInfo.formattedIdNumber}</span>
          </div>

          <div className="id-info-item">
            <span className="id-info-label">Date of Birth:</span>
            <span className="id-info-value">
              {idInfo.dateOfBirth.formattedDate}
            </span>
          </div>

          <div className="id-info-item">
            <span className="id-info-label">Age:</span>
            <span className="id-info-value">
              {idInfo.dateOfBirth.age} years
            </span>
          </div>

          <div className="id-info-item">
            <span className="id-info-label">Gender:</span>
            <span className="id-info-value">{idInfo.gender.gender}</span>
          </div>

          <div className="id-info-item">
            <span className="id-info-label">Citizenship:</span>
            <span className="id-info-value">
              {idInfo.citizenship.citizenshipStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="id-info-note">
        <p>
          <strong>Note:</strong> This information is automatically extracted
          from your ID number and cannot be edited. If any information is
          incorrect, please contact support.
        </p>
      </div>
    </div>
  );
};

export default IdNumberInfo;
