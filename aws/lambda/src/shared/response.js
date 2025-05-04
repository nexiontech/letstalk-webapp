/**
 * Shared response utilities for Lambda functions
 */

/**
 * Create a successful response
 * @param {Object|Array} data - The data to include in the response
 * @param {number} statusCode - The HTTP status code (default: 200)
 * @returns {Object} - The API Gateway response object
 */
const success = (data, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // For CORS support
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(data)
  };
};

/**
 * Create an error response
 * @param {string} message - The error message
 * @param {number} statusCode - The HTTP status code (default: 500)
 * @param {Object} errorDetails - Additional error details
 * @returns {Object} - The API Gateway response object
 */
const error = (message, statusCode = 500, errorDetails = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // For CORS support
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message,
      ...errorDetails
    })
  };
};

module.exports = {
  success,
  error
};
