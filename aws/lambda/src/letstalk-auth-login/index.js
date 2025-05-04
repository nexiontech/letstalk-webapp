/**
 * Authenticate user and return tokens
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} - API Gateway Lambda Proxy Output Format
 */

const { success, error } = require('../shared/response');
const { validateRequiredFields } = require('../shared/validation');
const { loginUser } = require('../shared/auth');

exports.handler = async (event) => {
    try {
        // Log the event for debugging
        console.log('Event:', JSON.stringify(event, null, 2));

        // Parse request body
        const requestBody = JSON.parse(event.body || '{}');

        // Validate input
        const requiredFields = ['username', 'password'];
        const validation = validateRequiredFields(requestBody, requiredFields);

        if (!validation.isValid) {
            return error(`Missing required fields: ${validation.missingFields.join(', ')}`, 400);
        }

        const { username, password } = requestBody;

        // Authenticate the user using the shared auth module
        const authResponse = await loginUser(username, password);

        // Return successful response with tokens
        return success({
            message: 'Authentication successful',
            username: username,
            tokens: {
                idToken: authResponse.AuthenticationResult.IdToken,
                accessToken: authResponse.AuthenticationResult.AccessToken,
                refreshToken: authResponse.AuthenticationResult.RefreshToken,
                expiresIn: authResponse.AuthenticationResult.ExpiresIn
            }
        });
    } catch (err) {
        console.error('Error:', err);

        // Handle specific Cognito errors
        if (err.code === 'NotAuthorizedException') {
            return error('Incorrect username or password', 401);
        }

        if (err.code === 'UserNotConfirmedException') {
            return error('User is not confirmed', 403, {
                code: 'UserNotConfirmed',
                username: JSON.parse(event.body || '{}').username
            });
        }

        if (err.code === 'UserNotFoundException') {
            return error('User does not exist', 404);
        }

        // Return generic error response
        return error('Authentication failed', 500, { details: err.message });
    }
};
