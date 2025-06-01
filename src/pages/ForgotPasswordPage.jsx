/*src/pages/ForgotPasswordPage.jsx*/
import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faKey,
  faUserCheck,
  faLock,
  faQuestionCircle,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import SEOHead from '../components/SEOHead';

function ForgotPasswordPage() {
  const seoData = {
    title: "Reset Your Password | Let's Talk Platform",
    description:
      "Securely reset your password for Let's Talk platform. Access your citizen engagement account with our secure password recovery system.",
    keywords:
      "password reset, account recovery, secure login, Let's Talk platform, citizen services, South Africa",
    type: 'website',
  };

  const securityFeatures = [
    {
      icon: faShieldAlt,
      title: 'Secure Process',
      description:
        'Our password reset process uses industry-standard security measures to protect your account',
    },
    {
      icon: faKey,
      title: 'ID Number Verification',
      description:
        'We use your South African ID number for secure identity verification',
    },
    {
      icon: faUserCheck,
      title: 'Email Confirmation',
      description:
        'Reset instructions are sent only to your registered email address',
    },
    {
      icon: faLock,
      title: 'Strong Passwords',
      description: 'Create a new strong password to keep your account secure',
    },
  ];

  const helpSteps = [
    {
      step: 1,
      title: 'Enter Your ID Number',
      description:
        'Provide the South African ID number associated with your account',
    },
    {
      step: 2,
      title: 'Check Your Email',
      description:
        "We'll send a verification code to your registered email address",
    },
    {
      step: 3,
      title: 'Enter Verification Code',
      description: 'Use the code from your email to verify your identity',
    },
    {
      step: 4,
      title: 'Create New Password',
      description: 'Set a new, strong password for your account',
    },
  ];

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <SEOHead {...seoData} />

      <Grid container spacing={4} alignItems="flex-start">
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
                color: '#0E4649',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Reset Your Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                color: 'text.secondary',
                mb: 3,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Don't worry! It happens to the best of us. Follow the steps below
              to securely reset your password.
            </Typography>
          </Box>

          <ForgotPasswordForm />
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} md={6}>
          {/* Security Features */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#0E4649',
                mb: 3,
              }}
            >
              <FontAwesomeIcon
                icon={faShieldAlt}
                style={{ marginRight: '0.5rem' }}
              />
              Security Features
            </Typography>

            <Grid container spacing={2}>
              {securityFeatures.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <FontAwesomeIcon
                      icon={feature.icon}
                      style={{
                        fontSize: '2rem',
                        color: '#FFB61D',
                        marginBottom: '0.5rem',
                      }}
                    />
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#0E4649',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.9rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* How It Works */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#0E4649',
                mb: 3,
              }}
            >
              How Password Reset Works
            </Typography>

            {helpSteps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: index < helpSteps.length - 1 ? 2 : 0,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#0E4649',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    mr: 2,
                    flexShrink: 0,
                  }}
                >
                  {step.step}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#0E4649',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Help Section */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={1} sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            sx={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#0E4649',
              textAlign: 'center',
              mb: 3,
            }}
          >
            <FontAwesomeIcon
              icon={faQuestionCircle}
              style={{ marginRight: '0.5rem' }}
            />
            Need Additional Help?
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: '1rem',
              lineHeight: 1.7,
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            If you're having trouble resetting your password or don't receive
            the verification email, our support team is here to help. We
            understand how important it is to access your Let's Talk account to
            manage your municipal services and stay connected with your
            community.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              lineHeight: 1.7,
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Contact our support team through the About Us page, and we'll assist
            you in regaining access to your account securely. Remember to have
            your South African ID number ready when contacting support.
          </Typography>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ marginRight: '0.5rem', color: '#0E4649' }}
            />
            <Typography variant="body2" color="text.secondary">
              Support available Monday - Friday, 8:00 AM - 5:00 PM SAST
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ForgotPasswordPage;
