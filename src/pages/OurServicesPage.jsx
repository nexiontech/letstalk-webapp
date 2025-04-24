import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent } from '@mui/material';

const OurServicesPage = () => {
  const services = [
    {
      title: 'Service Reporting',
      description: 'Report issues with government services and track their resolution.'
    },
    {
      title: 'Community Hub',
      description: 'Connect with your community and stay informed about local events and news.'
    },
    {
      title: 'Government Services Directory',
      description: 'Find information about government services and how to access them.'
    },
    {
      title: 'AI Chatbot Assistance',
      description: 'Get help and information through our AI-powered chatbot.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Our Services
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="body1" paragraph>
            We offer a range of services designed to improve citizen engagement with government.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default OurServicesPage;
