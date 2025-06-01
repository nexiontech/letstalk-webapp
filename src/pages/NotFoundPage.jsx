/*src/pages/NotFoundPage.jsx*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faQuestionCircle,
  faPhone,
  faExclamationTriangle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import SEOHead from '../components/SEOHead';

function NotFoundPage() {
  const seoData = {
    title: '404 - Page Not Found | Let\'s Talk Platform',
    description: 'The page you\'re looking for doesn\'t exist. Explore our citizen engagement platform with municipal services, community features, and government service access.',
    keywords: 'page not found, 404 error, Let\'s Talk platform, citizen services, municipal services, South Africa',
    type: 'website'
  };

  const helpfulLinks = [
    {
      title: 'Homepage',
      description: 'Return to our main page and explore all available services',
      icon: faHome,
      link: '/',
      color: '#0E4649'
    },
    {
      title: 'Service Issues',
      description: 'Report and track municipal service issues in your area',
      icon: faSearch,
      link: '/service-issues',
      color: '#FFB61D'
    },
    {
      title: 'FAQ',
      description: 'Find answers to frequently asked questions about our platform',
      icon: faQuestionCircle,
      link: '/faq',
      color: '#2E8B57'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our support team for assistance',
      icon: faPhone,
      link: '/about-us',
      color: '#FF6B6B'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <SEOHead {...seoData} />

      {/* Main Error Section */}
      <Box textAlign="center" mb={6}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          style={{
            fontSize: '4rem',
            color: '#FFB61D',
            marginBottom: '1rem'
          }}
        />
        <Typography variant="h1" component="h1" gutterBottom sx={{
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          fontWeight: 'bold',
          color: '#0E4649'
        }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom sx={{
          fontSize: { xs: '1.2rem', md: '1.5rem' },
          color: 'text.secondary',
          mb: 3
        }}>
          Oops! The page you're looking for doesn't exist
        </Typography>
        <Typography variant="body1" sx={{
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto',
          mb: 4
        }}>
          Don't worry! This happens sometimes. The page you're trying to reach may have been moved,
          deleted, or you may have typed the URL incorrectly. Let's get you back on track with our
          citizen engagement platform.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          sx={{
            backgroundColor: '#0E4649',
            '&:hover': { backgroundColor: '#0a3a3d' },
            px: 4,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Back to Homepage
        </Button>
      </Box>

      {/* Helpful Links Section */}
      <Box mb={6}>
        <Typography variant="h3" component="h3" textAlign="center" gutterBottom sx={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#0E4649',
          mb: 4
        }}>
          Where would you like to go?
        </Typography>

        <Grid container spacing={3}>
          {helpfulLinks.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                component={Link}
                to={item.link}
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    elevation: 4,
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    fontSize: '2.5rem',
                    color: item.color,
                    marginBottom: '1rem'
                  }}
                />
                <Typography variant="h6" component="h4" gutterBottom sx={{
                  fontWeight: 'bold',
                  color: '#0E4649'
                }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Platform Section */}
      <Paper elevation={1} sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h4" component="h4" gutterBottom sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#0E4649',
          textAlign: 'center',
          mb: 3
        }}>
          About Let's Talk Platform
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
          Let's Talk is South Africa's premier citizen engagement platform, designed to bridge the gap
          between citizens and municipal services. Our comprehensive platform provides tools for reporting
          service issues, accessing government services, making utility payments, and engaging with your
          local community.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
          Whether you need to report a water outage, pay your electricity bill, or connect with your
          neighbors about local issues, Let's Talk makes it easy and efficient. Our platform is built
          with South African citizens in mind, featuring local language support and integration with
          municipal systems across all nine provinces.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
          Join thousands of community members who are already using Let's Talk to stay connected with
          essential services and make their voices heard in local government. Together, we're building
          stronger, more responsive communities across South Africa.
        </Typography>
      </Paper>
    </Container>
  );
}

export default NotFoundPage;
