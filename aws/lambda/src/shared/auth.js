/**
 * Shared authentication utilities for Lambda functions
 */

const AWS = require('aws-sdk');

// Initialize Cognito Identity Provider
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REGION || 'af-south-1'
});

// Cognito User Pool ID and Client ID
const USER_POOL_ID = process.env.USER_POOL_ID || 'af-south-1_GQY6bDSyn';
const CLIENT_ID = process.env.CLIENT_ID || 'sqnv3kv55jothg6fr075bmbaq';

/**
 * Extract user information from API Gateway event
 * @param {Object} event - The API Gateway event
 * @returns {Object|null} - The user information or null if not authenticated
 */
const getUserFromEvent = (event) => {
  try {
    // Check if the request came through API Gateway with Cognito authorizer
    if (event.requestContext &&
        event.requestContext.authorizer &&
        event.requestContext.authorizer.claims) {

      const claims = event.requestContext.authorizer.claims;

      return {
        sub: claims.sub,
        email: claims.email,
        name: claims.name,
        idNumber: claims['custom:idNumber']
      };
    }

    // For local testing with mock authentication
    if (process.env.STAGE === 'dev' && event.headers && event.headers['x-mock-user']) {
      try {
        return JSON.parse(event.headers['x-mock-user']);
      } catch (e) {
        console.error('Error parsing mock user:', e);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting user from event:', error);
    return null;
  }
};

/**
 * Check if the user is authenticated
 * @param {Object} event - The API Gateway event
 * @returns {boolean} - Whether the user is authenticated
 */
const isAuthenticated = (event) => {
  return getUserFromEvent(event) !== null;
};

/**
 * Check if the user has admin role
 * @param {Object} event - The API Gateway event
 * @returns {boolean} - Whether the user has admin role
 */
const isAdmin = (event) => {
  try {
    const user = getUserFromEvent(event);

    if (!user) {
      return false;
    }

    // Check for admin group in Cognito groups
    if (event.requestContext &&
        event.requestContext.authorizer &&
        event.requestContext.authorizer.claims &&
        event.requestContext.authorizer.claims['cognito:groups']) {

      const groups = event.requestContext.authorizer.claims['cognito:groups'];
      return groups.includes('Admins');
    }

    // For local testing with mock admin
    if (process.env.STAGE === 'dev' &&
        event.headers &&
        event.headers['x-mock-admin'] === 'true') {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Register a new user in Cognito
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration result
 */
const registerUser = async (userData) => {
  const { username, password, email, name, phone_number } = userData;

  // Set up user attributes
  const userAttributes = [
    { Name: 'email', Value: email },
    { Name: 'name', Value: name },
    { Name: 'email_verified', Value: 'false' }
  ];

  // Add phone number if provided
  if (phone_number) {
    userAttributes.push({ Name: 'phone_number', Value: phone_number });
  }

  // Set up sign-up parameters
  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: userAttributes
  };

  // Sign up the user
  return await cognito.signUp(params).promise();
};

/**
 * Authenticate a user and get tokens
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise<Object>} - Authentication result with tokens
 */
const loginUser = async (username, password) => {
  // Set up authentication parameters
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  };

  // Authenticate the user
  return await cognito.initiateAuth(params).promise();
};

/**
 * Refresh authentication tokens
 * @param {string} refreshToken - The refresh token
 * @returns {Promise<Object>} - New tokens
 */
const refreshTokens = async (refreshToken) => {
  // Set up refresh parameters
  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken
    }
  };

  // Refresh the tokens
  return await cognito.initiateAuth(params).promise();
};

/**
 * Verify a user account with confirmation code
 * @param {string} username - The username
 * @param {string} confirmationCode - The confirmation code
 * @returns {Promise<Object>} - Verification result
 */
const verifyUser = async (username, confirmationCode) => {
  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    ConfirmationCode: confirmationCode
  };

  return await cognito.confirmSignUp(params).promise();
};

/**
 * Initiate forgot password flow
 * @param {string} username - The username
 * @returns {Promise<Object>} - Forgot password result
 */
const forgotPassword = async (username) => {
  const params = {
    ClientId: CLIENT_ID,
    Username: username
  };

  return await cognito.forgotPassword(params).promise();
};

/**
 * Reset password with confirmation code
 * @param {string} username - The username
 * @param {string} confirmationCode - The confirmation code
 * @param {string} newPassword - The new password
 * @returns {Promise<Object>} - Reset password result
 */
const resetPassword = async (username, confirmationCode, newPassword) => {
  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    ConfirmationCode: confirmationCode,
    Password: newPassword
  };

  return await cognito.confirmForgotPassword(params).promise();
};

module.exports = {
  getUserFromEvent,
  isAuthenticated,
  isAdmin,
  registerUser,
  loginUser,
  refreshTokens,
  verifyUser,
  forgotPassword,
  resetPassword,
  cognito,
  USER_POOL_ID,
  CLIENT_ID
};
