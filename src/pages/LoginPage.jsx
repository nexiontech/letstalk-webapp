import React from 'react';
import LoginForm from '../components/LoginForm';
import Container from '@mui/material/Container'; // Import Container

function LoginPage() {
    return (
        <Container component="main" maxWidth="xs"> {/* Use Container */}
            <LoginForm />
        </Container>
    );
}

export default LoginPage;
