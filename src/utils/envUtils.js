// src/utils/envUtils.js

/**
 * Utility function to get environment variables from Vite's import.meta.env
 *
 * @param {string} key - The environment variable key to retrieve
 * @param {string} defaultValue - Default value to return if the key is not found
 * @returns {string} - The value of the environment variable or the default value
 */
export const getEnvVariable = (key, defaultValue = '') => {
  // In Vite, environment variables are always accessed via import.meta.env
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
    identityPoolId: getEnvVariable('VITE_COGNITO_IDENTITY_POOL_ID'),
  };
};

/**
 * Get maintenance mode configuration from environment variables with config file fallback
 * @returns {Object} - Object containing maintenance mode configuration
 */
export const getMaintenanceConfig = () => {
  // Use the config file values as defaults
  const configDefaults = {
    isEnabled: false, // This should match the config file
    message:
      'We are currently performing scheduled maintenance to improve your experience. Our team is working to enhance the platform and will have everything back online shortly.',
    estimatedTime:
      'We expect to be back online within the next few hours. Please check back soon.',
    contactEmail: 'support@saya-setona.co.za',
  };

  return {
    isEnabled:
      getEnvVariable('VITE_MAINTENANCE_MODE', 'false') === 'true' ||
      configDefaults.isEnabled,
    message: getEnvVariable('VITE_MAINTENANCE_MESSAGE', configDefaults.message),
    estimatedTime: getEnvVariable(
      'VITE_MAINTENANCE_ESTIMATED_TIME',
      configDefaults.estimatedTime
    ),
    contactEmail: getEnvVariable(
      'VITE_MAINTENANCE_CONTACT_EMAIL',
      configDefaults.contactEmail
    ),
  };
};

/**
 * Check if authentication bypass is enabled for development
 * @returns {boolean} - True if auth bypass is enabled
 */
export const isAuthBypassEnabled = () => {
  return getEnvVariable('VITE_BYPASS_AUTH', 'false') === 'true';
};

/**
 * Get mock user data for development auth bypass
 * @returns {Object} - Mock user object for development
 */
export const getMockUser = () => {
  return {
    idNumber: '9001010001088',
    email: 'thabo.mthembu@cloudynconnect.co.za',
    name: 'Thabo Mthembu',
    firstName: 'Thabo',
    lastName: 'Mthembu',
    role: 'citizen',
    documentType: 'idNumber',
    address: '123 Nelson Mandela Drive, Sandton, Johannesburg, 2196',
    phone: '+27 82 456 7890',
    city: 'Johannesburg',
    province: 'Gauteng',
    postalCode: '2196',
    country: 'South Africa',
  };
};

/**
 * Check if white label mode is enabled
 * @returns {boolean} - True if white label mode is enabled
 */
export const isWhiteLabelEnabled = () => {
  return getEnvVariable('VITE_WHITE_LABEL_ENABLED', 'false') === 'true';
};

/**
 * Get white label environment variable with fallback
 * @param {string} key - The white label environment variable key (without VITE_WL_ prefix)
 * @param {string} defaultValue - Default value to return if the key is not found
 * @returns {string} - The value of the white label environment variable or the default value
 */
export const getWhiteLabelEnvVariable = (key, defaultValue = '') => {
  return getEnvVariable(`VITE_WL_${key}`, defaultValue);
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
    clientSecret: config.clientSecret ? '***' : 'not set',
  });
};
