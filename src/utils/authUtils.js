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
 * Validates an ID number format
 * @param {string} idNumber
 * @returns {boolean}
 */
export const validateIdNumber = (idNumber) => {
    // Assuming ID numbers should be 13 digits
    const idRegex = /^\d{13}$/;
    return idRegex.test(idNumber);
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
 * Formats a user object from Cognito
 * @param {object} cognitoUser - The user object from Cognito
 * @returns {object} - Formatted user object
 */
export const formatCognitoUser = (cognitoUser) => {
    if (!cognitoUser) return null;

    return {
        idNumber: cognitoUser.username,
        name: cognitoUser.attributes?.name || '',
        email: cognitoUser.attributes?.email || '',
    };
};