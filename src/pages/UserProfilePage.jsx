// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Alert, CircularProgress, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import UserProfileForm from '../components/UserProfileForm';
import './UserProfilePage.css';

const UserProfilePage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Set a small delay to ensure user data is loaded
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, isAuthenticated]);

  const handleUpdateSuccess = (message) => {
    setSuccess(message);
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  const handleUpdateError = (message) => {
    setError(message);
    // Clear error message after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  if (loading || pageLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="profile-hero-section">
        <Container maxWidth="lg">
          <Typography variant="h1" className="profile-hero-title">
            My Profile
          </Typography>
          <Typography variant="body1" className="profile-hero-subtitle">
            View and manage your account information
          </Typography>

          {/* Breadcrumbs */}
          <Breadcrumbs separator={<FontAwesomeIcon icon={faChevronRight} size="xs" />} aria-label="breadcrumb" className="breadcrumbs">
            <Link to="/dashboard" className="breadcrumb-link">
              <FontAwesomeIcon icon={faHome} className="breadcrumb-icon" />
              Dashboard
            </Link>
            <Typography color="text.primary">
              <FontAwesomeIcon icon={faUser} className="breadcrumb-icon" />
              My Profile
            </Typography>
          </Breadcrumbs>
        </Container>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg" className="profile-container">
        {error && (
          <Alert severity="error" className="profile-alert" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="profile-alert" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <Paper elevation={3} className="profile-paper">
          <Typography variant="h2" className="section-title">
            Personal Information
          </Typography>
          <Typography variant="body1" className="section-description">
            Update your personal information and contact details
          </Typography>

          <UserProfileForm 
            user={user} 
            onUpdateSuccess={handleUpdateSuccess} 
            onUpdateError={handleUpdateError} 
          />
        </Paper>
      </Container>
    </div>
  );
};

export default UserProfilePage;
