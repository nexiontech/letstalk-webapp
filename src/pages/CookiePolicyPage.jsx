import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const CookiePolicyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Cookie Policy
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. What Are Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by enabling certain features and functionality.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            2. How We Use Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies to remember your preferences, understand how you use our website, and improve your experience. This includes remembering your login status and language preferences.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            3. Types of Cookies We Use
          </Typography>
          <Typography variant="body1" paragraph>
            We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device for a specified period. We also use first-party cookies (set by us) and third-party cookies (set by our partners).
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            4. Managing Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser. You can delete existing cookies and set your browser to prevent new cookies from being set.
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            5. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CookiePolicyPage;
