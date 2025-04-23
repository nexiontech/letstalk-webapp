/*src/pages/LoginPage.jsx*/
import React from 'react';
import LoginForm from '../components/LoginForm';
import Container from '@mui/material/Container';

function LoginPage({ setIsAuthenticated }) { 
    return (
        <Container component="main" maxWidth="xs">
            <LoginForm setIsAuthenticated={setIsAuthenticated} /> 
        </Container>
    );
}

export default LoginPage; 
