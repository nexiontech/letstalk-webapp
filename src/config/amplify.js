// src/config/amplify.js
import { Amplify } from 'aws-amplify';

// Log environment variables for debugging
console.log('Amplify Configuration:', {
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
  domain: import.meta.env.VITE_COGNITO_DOMAIN
});

// Configure Amplify for AWS Amplify v6
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
      loginWith: {
        username: true,  // Using ID Number as username
        email: false     // Not using email as username
      },
      signUpAttributes: ['email', 'name', 'custom:idNumber'],
      mfa: {
        status: 'optional'
      },
      userAttributes: {
        email: {
          required: true
        },
        name: {
          required: true
        },
        'custom:idNumber': {
          required: true
        }
      }
    }
  }
});

export default Amplify;
