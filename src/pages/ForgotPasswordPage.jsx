/*src/pages/ForgotPasswordPage.jsx*/
import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Container from '@mui/material/Container';

function ForgotPasswordPage() {
  return (
    <Container component="main" maxWidth={false} sx={{ maxWidth: '100%' }}>
      <ForgotPasswordForm />
    </Container>
  );
}

export default ForgotPasswordPage;
