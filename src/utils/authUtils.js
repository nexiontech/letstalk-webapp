/**
 * Validates an email address format
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password
 * @returns {Object}
 */
export const validatePassword = (password) => {
    const result = {
        isValid: true,
        errors: []
    };

    if (password.length < 8) {
        result.errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        result.errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        result.errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        result.errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
        result.errors.push('Password must contain at least one special character (!@#$%^&*)');
    }

    result.isValid = result.errors.length === 0;
    return result;
};

/**
 * Validates a South African ID number format and checksum
 * @param {string} idNumber
 * @returns {boolean}
 */
export const validateIdNumber = (idNumber) => {
    // Check basic format (13 digits)
    const idRegex = /^\d{13}$/;
    if (!idRegex.test(idNumber)) {
        return false;
    }

    // Extract date components
    const year = parseInt(idNumber.substring(0, 2), 10);
    const month = parseInt(idNumber.substring(2, 4), 10);
    const day = parseInt(idNumber.substring(4, 6), 10);

    // Validate date components
    if (month < 1 || month > 12) {
        return false;
    }

    // Simple validation for days in month
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    // Validate citizenship digit (should be 0 or 1)
    const citizenshipDigit = parseInt(idNumber.charAt(10), 10);
    if (citizenshipDigit !== 0 && citizenshipDigit !== 1) {
        return false;
    }

    // Validate checksum using Luhn algorithm
    let sum = 0;
    let alternate = false;

    // Loop through digits from right to left
    for (let i = idNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(idNumber.charAt(i), 10);

        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        alternate = !alternate;
    }

    // ID is valid if sum is divisible by 10
    return (sum % 10 === 0);
};

/**
 * Validates that two passwords match
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

/**
 * Validates OTP format
 * @param {string} otp
 * @returns {boolean}
 */
export const validateOTP = (otp) => {
    // Assuming OTP should be 6 digits
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
};

/**
 * Validates a South African phone number
 * @param {string} phoneNumber
 * @returns {Object} - Validation result with isValid flag and error message
 */
export const validatePhoneNumber = (phoneNumber) => {
    // Allow empty phone number since it's optional
    if (!phoneNumber) {
        return { isValid: true };
    }

    // Remove spaces, dashes, and parentheses
    const cleanedNumber = phoneNumber.replace(/[\s\-()]/g, '');

    // Check if it's a valid South African number
    // Format can be: +27XXXXXXXXX or 0XXXXXXXXX (10 digits after the prefix)
    const saPhoneRegex = /^(\+27|0)[1-9][0-9]{8}$/;

    if (!saPhoneRegex.test(cleanedNumber)) {
        return {
            isValid: false,
            error: 'Please enter a valid South African phone number (e.g., +27 XX XXX XXXX or 0XX XXX XXXX)'
        };
    }

    return { isValid: true };
};

/**
 * Validates a passport number
 * @param {string} passportNumber
 * @returns {Object} - Validation result with isValid flag and error message
 */
export const validatePassportNumber = (passportNumber) => {
    if (!passportNumber) {
        return { isValid: false, error: 'Passport number is required' };
    }

    // Passport numbers are typically 8-9 characters, alphanumeric
    // This is a general validation, specific country formats may vary
    const passportRegex = /^[A-Z0-9]{6,12}$/i;

    if (!passportRegex.test(passportNumber)) {
        return {
            isValid: false,
            error: 'Please enter a valid passport number (6-12 alphanumeric characters)'
        };
    }

    return { isValid: true };
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalizeWords = (str) => {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Formats a user object from Cognito
 * @param {object} cognitoUser - The user object from Cognito
 * @param {boolean} hasIdentityPoolAccess - Whether the user has Identity Pool access
 * @returns {object} - Formatted user object
 */
export const formatCognitoUser = (cognitoUser, hasIdentityPoolAccess = false) => {
    if (!cognitoUser) return null;

    return {
        idNumber: cognitoUser.username,
        name: cognitoUser.attributes?.name || '',
        email: cognitoUser.attributes?.email || '',
        hasIdentityPoolAccess: hasIdentityPoolAccess,
        // Extract custom attributes if available
        customAttributes: {
            idNumber: cognitoUser.attributes?.['custom:idNumber'] || cognitoUser.username,
            address: cognitoUser.attributes?.['custom:address'] || '',
        }
    };
};