/*src/pages/RegisterPage.jsx*/
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Container from '@mui/material/Container'; // Import Container

function RegisterPage() {
  return (
    <Container component="main" maxWidth={false} sx={{ maxWidth: '100%' }}>
      {' '}
      {/* Full width container */}
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;
