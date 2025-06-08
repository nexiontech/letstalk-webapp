// src/components/MaintenanceMode.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  Build as BuildIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import SEOHead from './SEOHead';
import { getMaintenanceConfig } from '../utils/envUtils';

/**
 * MaintenanceMode Component
 * 
 * Displays a full-screen maintenance overlay when the site is under maintenance.
 * Features:
 * - Responsive design for desktop and mobile
 * - Material UI theme integration
 * - SEO meta tags for maintenance status
 * - Configurable messages via environment variables
 * - Smooth fade-in animation
 */
const MaintenanceMode = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const maintenanceConfig = getMaintenanceConfig();

  // SEO data for maintenance mode
  const seoData = {
    title: 'Site Under Maintenance - Let\'s Talk',
    description: 'Let\'s Talk is currently undergoing scheduled maintenance to improve your experience. We\'ll be back online shortly.',
    keywords: 'maintenance, scheduled maintenance, site down, let\'s talk, saya-setona',
    noIndex: true, // Don't index maintenance pages
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Site Under Maintenance',
      description: 'Let\'s Talk is currently undergoing scheduled maintenance.',
      url: 'https://letstalkbi.co.za',
      mainEntity: {
        '@type': 'Organization',
        name: 'Saya-Setona',
        url: 'https://saya-setona.co.za',
      },
    },
  };

  return (
    <>
      <SEOHead {...seoData} />
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999, // High z-index but below security overlay (10000+)
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            overflow: 'auto',
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 6 },
                textAlign: 'center',
                borderRadius: theme.shape.borderRadius * 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[8],
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src="/logo.png"
                  alt="Let's Talk Logo"
                  style={{
                    height: isMobile ? '60px' : '80px',
                    width: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </Box>

              {/* Maintenance Icon */}
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: '50%',
                    backgroundColor: `${theme.palette.primary.main}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${theme.palette.primary.main}30`,
                  }}
                >
                  <BuildIcon
                    sx={{
                      fontSize: { xs: 40, md: 50 },
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
              </Box>

              {/* Main Heading */}
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Site Under Maintenance
              </Typography>

              {/* Maintenance Message */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: theme.palette.text.secondary,
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                {maintenanceConfig.message}
              </Typography>

              {/* Estimated Time Section */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                }}
              >
                <ScheduleIcon
                  sx={{
                    color: theme.palette.secondary.main,
                    mr: { xs: 0, sm: 1 },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {maintenanceConfig.estimatedTime}
                </Typography>
              </Box>

              {/* Contact Information */}
              <Box
                sx={{
                  pt: 3,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                }}
              >
                <EmailIcon
                  sx={{
                    color: theme.palette.text.secondary,
                    mr: { xs: 0, sm: 1 },
                    fontSize: '1.2rem',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Need assistance? Contact us at{' '}
                  <Typography
                    component="a"
                    href={`mailto:${maintenanceConfig.contactEmail}`}
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {maintenanceConfig.contactEmail}
                  </Typography>
                </Typography>
              </Box>

              {/* Footer */}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 4,
                  color: theme.palette.text.secondary,
                  opacity: 0.8,
                }}
              >
                © 2025 Saya-Setona. All rights reserved.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Fade>
    </>
  );
};

export default MaintenanceMode;
