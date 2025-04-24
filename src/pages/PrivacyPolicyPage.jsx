import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Privacy Policy
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information you provide directly to us when you create an account, report an issue, or interact with our services. This may include your name, email address, phone number, and details about service issues you report.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to help address service issues you report.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            3. Information Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            We may share information with government agencies to help resolve service issues you report. We do not sell your personal information to third parties.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            5. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to access, correct, or delete your personal information. You can manage your information through your account settings or by contacting us.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicyPage;
