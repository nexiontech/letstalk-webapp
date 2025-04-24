import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Us
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" paragraph>
            Welcome to our About Us page. This is a placeholder for the About Us content.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to connect citizens with government services and improve communication between the public and government agencies.
          </Typography>
          <Typography variant="body1" paragraph>
            We strive to make government services more accessible and transparent for all citizens.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutUsPage;
