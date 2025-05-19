// src/utils/envUtils.js

/**
 * Utility function to get environment variables from either Amplify environment variables or local .env file
 * This approach allows for development locally with .env and production with Amplify environment variables
 * 
 * @param {string} key - The environment variable key to retrieve
 * @param {string} defaultValue - Default value to return if the key is not found
 * @returns {string} - The value of the environment variable or the default value
 */
export const getEnvVariable = (key, defaultValue = '') => {
  // Check if running in Amplify environment (process.env will have Amplify variables)
  if (process.env[key]) {
    return process.env[key];
  }
  
  // Fallback to Vite's import.meta.env for local development
  return import.meta.env[key] || defaultValue;
};

/**
 * Get all Cognito configuration from environment variables
 * @returns {Object} - Object containing all Cognito configuration
 */
export const getCognitoConfig = () => {
  return {
    region: getEnvVariable('VITE_COGNITO_REGION'),
    userPoolId: getEnvVariable('VITE_COGNITO_USER_POOL_ID'),
    userPoolWebClientId: getEnvVariable('VITE_COGNITO_USER_POOL_WEB_CLIENT_ID'),
    clientSecret: getEnvVariable('VITE_COGNITO_CLIENT_SECRET'),
    domain: getEnvVariable('VITE_COGNITO_DOMAIN'),
    identityPoolId: getEnvVariable('VITE_COGNITO_IDENTITY_POOL_ID')
  };
};

/**
 * Log Cognito configuration for debugging (redacts sensitive information)
 * @param {string} context - Context for the log (e.g., 'Login', 'Registration')
 * @param {Object} config - Cognito configuration object
 */
export const logCognitoConfig = (context, config) => {
  console.log(`Cognito Configuration (${context}):`, {
    region: config.region,
    userPoolId: config.userPoolId,
    userPoolWebClientId: config.userPoolWebClientId,
    domain: config.domain,
    identityPoolId: config.identityPoolId ? '***' : 'not set',
    clientSecret: config.clientSecret ? '***' : 'not set'
  });
};
