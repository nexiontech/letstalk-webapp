/**
 * Register new user in Cognito
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} - API Gateway Lambda Proxy Output Format
 */

const { success, error } = require('../shared/response');
const { validateRequiredFields, isValidEmail } = require('../shared/validation');
const { registerUser } = require('../shared/auth');

exports.handler = async (event) => {
    try {
        // Log the event for debugging
        console.log('Event:', JSON.stringify(event, null, 2));

        // Parse request body
        const requestBody = JSON.parse(event.body || '{}');

        // Validate input
        const requiredFields = ['username', 'password', 'email', 'name'];
        const validation = validateRequiredFields(requestBody, requiredFields);

        if (!validation.isValid) {
            return error(`Missing required fields: ${validation.missingFields.join(', ')}`, 400);
        }

        // Validate email format
        if (!isValidEmail(requestBody.email)) {
            return error('Invalid email format', 400);
        }

        // Register the user using the shared auth module
        const signUpResponse = await registerUser(requestBody);

        // Return successful response
        return success({
            message: 'User registration successful',
            userId: signUpResponse.UserSub,
            username: requestBody.username,
            userConfirmed: signUpResponse.UserConfirmed
        });
    } catch (err) {
        console.error('Error:', err);

        // Handle specific Cognito errors
        if (err.code === 'UsernameExistsException') {
            return error('Username already exists', 409);
        }

        if (err.code === 'InvalidPasswordException') {
            return error('Invalid password format', 400, { details: err.message });
        }

        // Return generic error response
        return error('Registration failed', 500, { details: err.message });
    }
};
