// src/config/amplify.js
import { Amplify } from 'aws-amplify';
import { calculateSecretHash } from '../utils/secretHash';

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
      clientSecret: import.meta.env.VITE_COGNITO_CLIENT_SECRET, // Add client secret
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
      },
      // Add custom auth hooks to handle SECRET_HASH for all operations
      handleSignUp: async (input) => {
        const { username, password, options } = input;
        const secretHash = await calculateSecretHash(
          username,
          import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
          import.meta.env.VITE_COGNITO_CLIENT_SECRET
        );

        return {
          ...input,
          options: {
            ...options,
            secretHash
          }
        };
      },
      handleSignIn: async (input) => {
        const { username, password, options } = input;
        const secretHash = await calculateSecretHash(
          username,
          import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
          import.meta.env.VITE_COGNITO_CLIENT_SECRET
        );

        return {
          ...input,
          options: {
            ...options,
            secretHash
          }
        };
      },
      handleConfirmSignUp: async (input) => {
        const { username, confirmationCode, options } = input;
        const secretHash = await calculateSecretHash(
          username,
          import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
          import.meta.env.VITE_COGNITO_CLIENT_SECRET
        );

        return {
          ...input,
          options: {
            ...options,
            secretHash
          }
        };
      },
      handleResendSignUpCode: async (input) => {
        const { username, options } = input;
        const secretHash = await calculateSecretHash(
          username,
          import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
          import.meta.env.VITE_COGNITO_CLIENT_SECRET
        );

        return {
          ...input,
          options: {
            ...options,
            secretHash
          }
        };
      },
      handleResetPassword: async (input) => {
        const { username, options } = input;
        const secretHash = await calculateSecretHash(
          username,
          import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
          import.meta.env.VITE_COGNITO_CLIENT_SECRET
        );

        return {
          ...input,
          options: {
            ...options,
            secretHash
          }
        };
      },
      handleConfirmResetPassword: async (input) => {
        const { username, confirmationCode, newPassword, options } = input;
        const secretHash = await calculateSecretHash(
          username,
          import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
          import.meta.env.VITE_COGNITO_CLIENT_SECRET
        );

        return {
          ...input,
          options: {
            ...options,
            secretHash
          }
        };
      }
    }
  }
});

export default Amplify;
