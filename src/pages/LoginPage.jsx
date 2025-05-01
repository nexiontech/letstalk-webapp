/*src/pages/LoginPage.jsx*/
import React from 'react';
import LoginForm from '../components/LoginForm';
import Container from '@mui/material/Container';

function LoginPage() {
    return (
        <Container component="main" maxWidth="xs">
            <LoginForm />
        </Container>
    );
}

export default LoginPage;
