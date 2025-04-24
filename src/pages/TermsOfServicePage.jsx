import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TermsOfServicePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Terms of Service
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            2. Use of Services
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            3. User Content
          </Typography>
          <Typography variant="body1" paragraph>
            You retain ownership of any content you submit through our services. By submitting content, you grant us a license to use, modify, and display that content in connection with our services.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            4. Prohibited Activities
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to engage in any activity that interferes with or disrupts our services, or that attempts to access features or areas of our services that you are not authorized to access.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            5. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfServicePage;
