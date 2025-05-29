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
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          margin: 2,
          padding: 3,
          borderRadius: 2,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Cookie Consent
          </Typography>
          <IconButton
            size="small"
            onClick={() => setShowBanner(false)}
            sx={{ mt: -1, mr: -1 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          We use cookies and similar technologies to improve your experience, analyze site usage, 
          and provide personalized content and ads. You can manage your preferences below.
        </Typography>

        <Collapse in={showSettings}>
          <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Manage Your Preferences
            </Typography>
            
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={consents.analytics}
                    onChange={handleConsentChange('analytics')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Analytics Cookies
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Help us understand how visitors interact with our website
                    </Typography>
                  </Box>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={consents.advertising}
                    onChange={handleConsentChange('advertising')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Advertising Cookies
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Used to show you relevant ads based on your interests
                    </Typography>
                  </Box>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={consents.personalization}
                    onChange={handleConsentChange('personalization')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Personalization
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Customize content and ads based on your preferences
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </Box>
        </Collapse>

        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setShowSettings(!showSettings)}
            size="small"
            variant="text"
          >
            {showSettings ? 'Hide' : 'Customize'}
          </Button>
          
          <Stack direction="row" spacing={1}>
            <Button
              onClick={handleRejectAll}
              variant="outlined"
              size="small"
            >
              Reject All
            </Button>
            
            {showSettings ? (
              <Button
                onClick={handleSavePreferences}
                variant="contained"
                size="small"
              >
                Save Preferences
              </Button>
            ) : (
              <Button
                onClick={handleAcceptAll}
                variant="contained"
                size="small"
              >
                Accept All
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ConsentBanner;
