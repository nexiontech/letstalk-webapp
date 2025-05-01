/*src/pages/ApiLoginPage.jsx*/
import React from 'react';
import ApiLoginForm from '../components/ApiLoginForm';
import { Box, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

function ApiLoginPage() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Tabs value={0} centered>
                    <Tab label="Amplify Auth" component={Link} to="/login" />
                    <Tab label="API Gateway Auth" component={Link} to="/api-login" />
                </Tabs>
            </Paper>
            
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    API Gateway Authentication
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This page uses the API Gateway endpoints for authentication
                </Typography>
            </Box>
            
            <ApiLoginForm />
        </Container>
    );
}

export default ApiLoginPage;
