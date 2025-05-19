// src/config/amplify.js
import { Amplify } from 'aws-amplify';
import { calculateSecretHash } from '../utils/secretHash';
import { getCognitoConfig, logCognitoConfig } from '../utils/envUtils';

// Get Cognito configuration from environment variables
const cognitoConfig = getCognitoConfig();

// Log configuration for debugging
logCognitoConfig('Amplify Initialization', cognitoConfig);

// Configure Amplify for AWS Amplify v6
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolWebClientId,
      clientSecret: cognitoConfig.clientSecret, // Add client secret
      identityPoolId: cognitoConfig.identityPoolId, // Add identity pool ID
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
        const { username, options } = input;
        // Note: password is extracted by AWS Amplify internally
        const secretHash = await calculateSecretHash(
          username,
          cognitoConfig.userPoolWebClientId,
          cognitoConfig.clientSecret
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
        const { username, options } = input;
        // Note: password is extracted by AWS Amplify internally
        const secretHash = await calculateSecretHash(
          username,
          cognitoConfig.userPoolWebClientId,
          cognitoConfig.clientSecret
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
        const { username, options } = input;
        // Note: confirmationCode is extracted by AWS Amplify internally
        const secretHash = await calculateSecretHash(
          username,
          cognitoConfig.userPoolWebClientId,
          cognitoConfig.clientSecret
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
          cognitoConfig.userPoolWebClientId,
          cognitoConfig.clientSecret
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
          cognitoConfig.userPoolWebClientId,
          cognitoConfig.clientSecret
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
        const { username, options } = input;
        // Note: confirmationCode and newPassword are extracted by AWS Amplify internally
        const secretHash = await calculateSecretHash(
          username,
          cognitoConfig.userPoolWebClientId,
          cognitoConfig.clientSecret
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
