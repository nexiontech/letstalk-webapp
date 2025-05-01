/*src/pages/RegisterPage.jsx*/
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Container from '@mui/material/Container'; // Import Container

function RegisterPage() {
    return (
        <Container component="main" maxWidth="xs"> {/* Use Container */}
            <RegisterForm />
        </Container>
    );
}

export default RegisterPage;
