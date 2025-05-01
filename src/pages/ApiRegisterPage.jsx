/*src/pages/ApiRegisterPage.jsx*/
import React from 'react';
import ApiRegisterForm from '../components/ApiRegisterForm';
import { Box, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

function ApiRegisterPage() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Tabs value={1} centered>
                    <Tab label="Amplify Auth" component={Link} to="/register" />
                    <Tab label="API Gateway Auth" component={Link} to="/api-register" />
                </Tabs>
            </Paper>
            
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    API Gateway Registration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This page uses the API Gateway endpoints for registration
                </Typography>
            </Box>
            
            <ApiRegisterForm />
        </Container>
    );
}

export default ApiRegisterPage;
