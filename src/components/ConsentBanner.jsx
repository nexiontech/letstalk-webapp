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
import {
  Close as CloseIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  shouldShowBanner,
  updateConsentMode,
  trackConsentEvent,
  storeConsent,
  getStoredConsent,
  getUserRegion,
} from '../utils/consentMode';
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
    // Check if banner should be shown based on region and stored consent
    const shouldShow = shouldShowBanner();
    setShowBanner(shouldShow);

    // Load stored preferences if they exist
    const storedConsents = getStoredConsent();
    if (storedConsents) {
      setConsents(storedConsents);
      updateConsentMode(storedConsents);
    }

    // Log region info for debugging
    console.log(
      'Consent Banner - User Region:',
      getUserRegion(),
      'Show Banner:',
      shouldShow
    );
  }, []);

  const updateGoogleConsent = consentChoices => {
    // Use the utility function for proper consent mode v2 implementation
    updateConsentMode(consentChoices);
  };

  const handleAcceptAll = () => {
    const allConsents = {
      analytics: true,
      advertising: true,
      personalization: true,
    };
    setConsents(allConsents);
    updateGoogleConsent(allConsents);
    storeConsent(allConsents);
    setShowBanner(false);

    // Track acceptance event using utility function
    trackConsentEvent('consent_granted_all', allConsents, 'accept_all_button');
  };

  const handleRejectAll = () => {
    const noConsents = {
      analytics: false,
      advertising: false,
      personalization: false,
    };
    setConsents(noConsents);
    updateGoogleConsent(noConsents);
    storeConsent(noConsents);
    setShowBanner(false);

    // Track rejection event using utility function
    trackConsentEvent('consent_denied_all', noConsents, 'decline_all_button');
  };

  const handleSavePreferences = () => {
    updateGoogleConsent(consents);
    storeConsent(consents);
    setShowBanner(false);
    setShowSettings(false);

    // Track custom preferences event using utility function
    trackConsentEvent(
      'consent_custom_preferences',
      consents,
      'save_custom_preferences'
    );
  };

  const handleConsentChange = type => event => {
    setConsents(prev => ({
      ...prev,
      [type]: event.target.checked,
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
        borderTop: '2px solid #0E4649',
        borderRadius: '12px 12px 0 0',
        padding: { xs: 1.5, sm: 2 },
        boxShadow: '0 -2px 12px rgba(14, 70, 73, 0.12)',
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
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
                fontSize: { xs: '1rem', sm: '1.1rem' },
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
                color: 'grey.700',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.5,
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
          }}
        >
          We use cookies to enhance your experience and analyze site usage.
          Choose your preferences below.
        </Typography>

        <Collapse in={showSettings}>
          <Box
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: '#f8f9fa',
              borderRadius: 1.5,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: '#0E4649',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Customize Your Privacy Settings
            </Typography>

            <Stack spacing={1.5}>
              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  border: '1px solid #0E4649',
                  borderColor: 'rgba(14, 70, 73, 0.2)',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={consents.analytics}
                      onChange={handleConsentChange('analytics')}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ ml: 0.5 }}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        sx={{ fontSize: '0.85rem' }}
                      >
                        📊 Analytics & Performance
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.2, fontSize: '0.75rem' }}
                      >
                        Help us understand how visitors use our website
                      </Typography>
                    </Box>
                  }
                  sx={{ margin: 0, alignItems: 'flex-start' }}
                />
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  border: '1px solid #FFB61D',
                  borderColor: 'rgba(255, 182, 29, 0.3)',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={consents.advertising}
                      onChange={handleConsentChange('advertising')}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ ml: 0.5 }}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        sx={{ fontSize: '0.85rem' }}
                      >
                        🎯 Advertising & Marketing
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.2, fontSize: '0.75rem' }}
                      >
                        Show you relevant ads and measure effectiveness
                      </Typography>
                    </Box>
                  }
                  sx={{ margin: 0, alignItems: 'flex-start' }}
                />
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  border: '1px solid #2E8B57',
                  borderColor: 'rgba(46, 139, 87, 0.3)',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={consents.personalization}
                      onChange={handleConsentChange('personalization')}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ ml: 0.5 }}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        sx={{ fontSize: '0.85rem' }}
                      >
                        ✨ Personalization
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.2, fontSize: '0.75rem' }}
                      >
                        Customize content based on your preferences
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
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setShowSettings(!showSettings)}
            variant="text"
            size="small"
            sx={{
              color: '#0E4649',
              fontWeight: 500,
              fontSize: '0.8rem',
              '&:hover': {
                backgroundColor: 'rgba(14, 70, 73, 0.08)',
              },
            }}
          >
            {showSettings ? 'Hide Options' : 'Customize'}
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              onClick={handleRejectAll}
              variant="outlined"
              size="small"
              className="consent-decline-button"
              sx={{
                borderColor: '#DC3545',
                color: '#DC3545',
                fontWeight: 500,
                px: 2,
                fontSize: '0.8rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#DC3545',
                  backgroundColor: 'rgba(220, 53, 69, 0.08)',
                },
              }}
            >
              Decline
            </Button>

            {showSettings ? (
              <Button
                onClick={handleSavePreferences}
                variant="contained"
                size="small"
                className="consent-save-button"
                sx={{
                  backgroundColor: '#0E4649',
                  fontWeight: 500,
                  px: 2,
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1A5C60',
                  },
                }}
              >
                Save Choices
              </Button>
            ) : (
              <Button
                onClick={handleAcceptAll}
                variant="contained"
                size="small"
                className="consent-accept-button"
                sx={{
                  backgroundColor: '#2E8B57',
                  fontWeight: 500,
                  px: 2,
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#236B43',
                  },
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
