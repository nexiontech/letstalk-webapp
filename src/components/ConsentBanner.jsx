import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Collapse,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, Settings as SettingsIcon } from '@mui/icons-material';
import './ConsentBanner.css';

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consents, setConsents] = useState({
    analytics: false,
    advertising: false,
    personalization: false,
  });

  useEffect(() => {
    // Check if user has already made consent choices
    const consentGiven = localStorage.getItem('consent-preferences');
    if (!consentGiven) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedConsents = JSON.parse(consentGiven);
      setConsents(savedConsents);
      updateGoogleConsent(savedConsents);
    }
  }, []);

  const updateGoogleConsent = (consentChoices) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consentChoices.analytics ? 'granted' : 'denied',
        'ad_storage': consentChoices.advertising ? 'granted' : 'denied',
        'ad_user_data': consentChoices.advertising ? 'granted' : 'denied',
        'ad_personalization': consentChoices.personalization ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => {
    const allConsents = {
      analytics: true,
      advertising: true,
      personalization: true,
    };
    setConsents(allConsents);
    updateGoogleConsent(allConsents);
    localStorage.setItem('consent-preferences', JSON.stringify(allConsents));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const noConsents = {
      analytics: false,
      advertising: false,
      personalization: false,
    };
    setConsents(noConsents);
    updateGoogleConsent(noConsents);
    localStorage.setItem('consent-preferences', JSON.stringify(noConsents));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    updateGoogleConsent(consents);
    localStorage.setItem('consent-preferences', JSON.stringify(consents));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleConsentChange = (type) => (event) => {
    setConsents(prev => ({
      ...prev,
      [type]: event.target.checked
    }));
  };

  if (!showBanner) return null;

  return (
    <Paper
      elevation={6}
      className="consent-banner"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#fff',
        borderTop: '3px solid #0E4649',
        borderRadius: '16px 16px 0 0',
        padding: { xs: 2, sm: 3 },
        boxShadow: '0 -4px 20px rgba(14, 70, 73, 0.15)',
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#0E4649',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }}
            />
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
                color: '#0E4649',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Privacy & Cookies
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setShowBanner(false)}
            sx={{
              color: 'grey.500',
              '&:hover': {
                backgroundColor: 'grey.100',
                color: 'grey.700'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', sm: '0.9rem' }
          }}
        >
          We use cookies to enhance your experience, analyze site usage, and provide personalized content.
          Your privacy matters to us - choose your preferences below.
        </Typography>

        <Collapse in={showSettings}>
          <Box sx={{
            mb: 3,
            p: 3,
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#0E4649'
              }}
            >
              Customize Your Privacy Settings
            </Typography>

            <Stack spacing={2.5}>
              <Box sx={{
                p: 2,
                backgroundColor: 'white',
                borderRadius: 1.5,
                border: '1px solid #0E4649',
                borderColor: 'rgba(14, 70, 73, 0.2)'
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={consents.analytics}
                      onChange={handleConsentChange('analytics')}
                      color="primary"
                      size="medium"
                    />
                  }
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="body1" fontWeight="medium" color="text.primary">
                        📊 Analytics & Performance
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Help us understand how visitors use our website to improve your experience
                      </Typography>
                    </Box>
                  }
                  sx={{ margin: 0, alignItems: 'flex-start' }}
                />
              </Box>

              <Box sx={{
                p: 2,
                backgroundColor: 'white',
                borderRadius: 1.5,
                border: '1px solid #FFB61D',
                borderColor: 'rgba(255, 182, 29, 0.3)'
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={consents.advertising}
                      onChange={handleConsentChange('advertising')}
                      color="primary"
                      size="medium"
                    />
                  }
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="body1" fontWeight="medium" color="text.primary">
                        🎯 Advertising & Marketing
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Show you relevant ads and measure advertising effectiveness
                      </Typography>
                    </Box>
                  }
                  sx={{ margin: 0, alignItems: 'flex-start' }}
                />
              </Box>

              <Box sx={{
                p: 2,
                backgroundColor: 'white',
                borderRadius: 1.5,
                border: '1px solid #2E8B57',
                borderColor: 'rgba(46, 139, 87, 0.3)'
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={consents.personalization}
                      onChange={handleConsentChange('personalization')}
                      color="primary"
                      size="medium"
                    />
                  }
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="body1" fontWeight="medium" color="text.primary">
                        ✨ Personalization
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Customize content and recommendations based on your preferences
                      </Typography>
                    </Box>
                  }
                  sx={{ margin: 0, alignItems: 'flex-start' }}
                />
              </Box>
            </Stack>
          </Box>
        </Collapse>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setShowSettings(!showSettings)}
            variant="text"
            sx={{
              color: '#0E4649',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(14, 70, 73, 0.08)'
              }
            }}
          >
            {showSettings ? 'Hide Options' : 'Customize Settings'}
          </Button>

          <Stack direction="row" spacing={1.5}>
            <Button
              onClick={handleRejectAll}
              variant="outlined"
              className="consent-decline-button"
              sx={{
                borderColor: '#DC3545',
                color: '#DC3545',
                fontWeight: 500,
                px: 3,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#DC3545',
                  backgroundColor: 'rgba(220, 53, 69, 0.08)'
                }
              }}
            >
              Decline
            </Button>

            {showSettings ? (
              <Button
                onClick={handleSavePreferences}
                variant="contained"
                className="consent-save-button"
                sx={{
                  backgroundColor: '#0E4649',
                  fontWeight: 500,
                  px: 3,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1A5C60'
                  }
                }}
              >
                Save My Choices
              </Button>
            ) : (
              <Button
                onClick={handleAcceptAll}
                variant="contained"
                className="consent-accept-button"
                sx={{
                  backgroundColor: '#2E8B57',
                  fontWeight: 500,
                  px: 3,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#236B43'
                  }
                }}
              >
                Accept All
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ConsentBanner;
