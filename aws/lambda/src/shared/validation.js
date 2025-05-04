/**
 * Shared validation utilities for Lambda functions
 */

/**
 * Validate required fields in an object
 * @param {Object} data - The data to validate
 * @param {Array<string>} requiredFields - The required fields
 * @returns {Object} - Validation result with isValid and missing fields
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate South African ID number
 * @param {string} idNumber - The ID number to validate
 * @returns {boolean} - Whether the ID number is valid
 */
const isValidSAID = (idNumber) => {
  // Basic validation for South African ID number
  // Format: YYMMDD SSSS 08 Z
  // Where:
  // - YYMMDD is the date of birth
  // - SSSS is the gender (0-4999 for females, 5000-9999 for males)
  // - 08 is the citizenship (0 for SA citizen, 1 for permanent resident)
  // - Z is the checksum digit
  
  if (!idNumber || typeof idNumber !== 'string') {
    return false;
  }
  
  // Remove spaces and check length
  const cleanId = idNumber.replace(/\s/g, '');
  if (cleanId.length !== 13 || !/^\d+$/.test(cleanId)) {
    return false;
  }
  
  // Extract date components
  const year = parseInt(cleanId.substring(0, 2));
  const month = parseInt(cleanId.substring(2, 4));
  const day = parseInt(cleanId.substring(4, 6));
  
  // Basic date validation
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  
  // Validate checksum
  const digits = cleanId.split('').map(d => parseInt(d));
  const oddSum = digits.filter((_, i) => i % 2 === 0 && i < 12).reduce((sum, d) => sum + d, 0);
  
  let evenSum = 0;
  for (let i = 1; i < 12; i += 2) {
    const doubled = digits[i] * 2;
    evenSum += doubled > 9 ? doubled - 9 : doubled;
  }
  
  const checksum = (10 - ((oddSum + evenSum) % 10)) % 10;
  
  return checksum === digits[12];
};

/**
 * Validate phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
const isValidPhone = (phone) => {
  // Basic validation for South African phone numbers
  // Allows formats like: +27821234567, 27821234567, 0821234567
  const phoneRegex = /^(\+27|27|0)[6-8][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

module.exports = {
  validateRequiredFields,
  isValidEmail,
  isValidSAID,
  isValidPhone
};
