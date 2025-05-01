/*src/pages/RegisterPage.jsx*/
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Box, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

function RegisterPage() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Tabs value={0} centered>
                    <Tab label="Amplify Auth" component={Link} to="/register" />
                    <Tab label="API Gateway Auth" component={Link} to="/api-register" />
                </Tabs>
            </Paper>

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Amplify Registration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This page uses AWS Amplify for registration
                </Typography>
            </Box>

            <RegisterForm />
        </Container>
    );
}

export default RegisterPage;
