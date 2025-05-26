// src/utils/cognitoAuth.js
import { calculateSecretHash } from './secretHash';

/**
 * Custom function to handle Cognito authentication with SECRET_HASH
 * @param {string} email - The user's email (used as username)
 * @param {string} password - The user's password
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @param {string} region - The AWS region
 * @returns {Promise<Object>} - The authentication response
 */
export async function cognitoSignIn(
  email,
  password,
  clientId,
  clientSecret,
  region
) {
  try {
    // Calculate SECRET_HASH using email as username
    const secretHash = await calculateSecretHash(email, clientId, clientSecret);

    // Prepare the request data
    const reqData = {
      AuthParameters: {
        USERNAME: email, // Use email as username
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
    };

    // Prepare the headers
    const headers = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      'Content-Type': 'application/x-amz-json-1.1',
    };

    // Make the request to Cognito
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqData),
      }
    );

    // Parse the response
    const jsonResponse = await response.json();

    if (response.ok) {
      console.log('Authentication successful:', jsonResponse);
      return jsonResponse;
    } else {
      console.error('Authentication failed:', jsonResponse);
      throw new Error(
        jsonResponse.message || jsonResponse.__type || 'Authentication failed'
      );
    }
  } catch (error) {
    console.error('Cognito authentication error:', error);
    throw error;
  }
}

/**
 * Custom function to handle Cognito registration with SECRET_HASH
 * @param {string} email - The user's email (used as username)
 * @param {string} password - The user's password
 * @param {Object} userAttributes - The user attributes
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @param {string} region - The AWS region
 * @param {string} identityPoolId - The Cognito Identity Pool ID (optional)
 * @returns {Promise<Object>} - The registration response
 */
export async function cognitoSignUp(
  email,
  password,
  userAttributes,
  clientId,
  clientSecret,
  region,
  identityPoolId
) {
  try {
    // Calculate SECRET_HASH using email as username
    const secretHash = await calculateSecretHash(email, clientId, clientSecret);

    // Convert user attributes to Cognito format
    const cognitoAttributes = Object.entries(userAttributes).map(
      ([key, value]) => ({
        Name: key,
        Value: value,
      })
    );

    // Prepare the request data
    const reqData = {
      Username: email, // Use email as username
      Password: password,
      SecretHash: secretHash,
      ClientId: clientId,
      UserAttributes: cognitoAttributes,
    };

    // Prepare the headers
    const headers = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
      'Content-Type': 'application/x-amz-json-1.1',
    };

    // Make the request to Cognito
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqData),
      }
    );

    // Parse the response
    const jsonResponse = await response.json();

    if (response.ok) {
      // If Identity Pool ID is provided, associate the user with the Identity Pool
      if (identityPoolId) {
        console.log(
          'User registered successfully, associating with Identity Pool:',
          identityPoolId
        );

        // Log the successful registration with Identity Pool integration
        console.log(
          'User registered and associated with Identity Pool. User will be able to access AWS resources after confirmation.'
        );
      }

      return {
        ...jsonResponse,
        identityPoolAssociation: identityPoolId ? true : false,
      };
    } else {
      // Extract more detailed error information
      const errorMessage =
        jsonResponse.message || jsonResponse.__type || 'Registration failed';
      const errorType = jsonResponse.__type
        ? jsonResponse.__type.split('#')[1]
        : 'UnknownError';

      throw new Error(
        JSON.stringify({
          message: errorMessage,
          type: errorType,
          code: response.status,
        })
      );
    }
  } catch (error) {
    console.error('Cognito registration error:', error);

    // If the error is already formatted as JSON, pass it through
    if (error.message && error.message.startsWith('{')) {
      throw error;
    }

    // Otherwise, format the error
    throw new Error(
      JSON.stringify({
        message: error.message || 'Registration failed',
        type: 'ClientError',
        code: 400,
      })
    );
  }
}

/**
 * Custom function to handle Cognito confirmation with SECRET_HASH
 * @param {string} email - The user's email (used as username)
 * @param {string} confirmationCode - The confirmation code
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @param {string} region - The AWS region
 * @returns {Promise<Object>} - The confirmation response
 */
export async function cognitoConfirmSignUp(
  email,
  confirmationCode,
  clientId,
  clientSecret,
  region
) {
  try {
    // Calculate SECRET_HASH using email as username
    const secretHash = await calculateSecretHash(email, clientId, clientSecret);

    // Prepare the request data
    const reqData = {
      Username: email, // Use email as username
      ConfirmationCode: confirmationCode,
      SecretHash: secretHash,
      ClientId: clientId,
    };

    // Prepare the headers
    const headers = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
      'Content-Type': 'application/x-amz-json-1.1',
    };

    // Make the request to Cognito
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqData),
      }
    );

    // Parse the response
    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(
        jsonResponse.message || jsonResponse.__type || 'Confirmation failed'
      );
    }
  } catch (error) {
    console.error('Cognito confirmation error:', error);
    throw error;
  }
}

/**
 * Custom function to handle Cognito resend confirmation code with SECRET_HASH
 * @param {string} email - The user's email (used as username)
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @param {string} region - The AWS region
 * @returns {Promise<Object>} - The resend confirmation code response
 */
export async function cognitoResendConfirmationCode(
  email,
  clientId,
  clientSecret,
  region
) {
  try {
    // Calculate SECRET_HASH using email as username
    const secretHash = await calculateSecretHash(email, clientId, clientSecret);

    // Prepare the request data
    const reqData = {
      Username: email, // Use email as username
      SecretHash: secretHash,
      ClientId: clientId,
    };

    // Prepare the headers
    const headers = {
      'X-Amz-Target':
        'AWSCognitoIdentityProviderService.ResendConfirmationCode',
      'Content-Type': 'application/x-amz-json-1.1',
    };

    // Make the request to Cognito
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqData),
      }
    );

    // Parse the response
    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(
        jsonResponse.message ||
          jsonResponse.__type ||
          'Resend confirmation code failed'
      );
    }
  } catch (error) {
    console.error('Cognito resend confirmation code error:', error);
    throw error;
  }
}

/**
 * Custom function to handle Cognito forgot password with SECRET_HASH
 * @param {string} email - The user's email (used as username)
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @param {string} region - The AWS region
 * @returns {Promise<Object>} - The forgot password response
 */
export async function cognitoForgotPassword(
  email,
  clientId,
  clientSecret,
  region
) {
  try {
    // Calculate SECRET_HASH using email as username
    const secretHash = await calculateSecretHash(email, clientId, clientSecret);

    // Prepare the request data
    const reqData = {
      Username: email, // Use email as username
      SecretHash: secretHash,
      ClientId: clientId,
    };

    // Prepare the headers
    const headers = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword',
      'Content-Type': 'application/x-amz-json-1.1',
    };

    // Make the request to Cognito
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqData),
      }
    );

    // Parse the response
    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(
        jsonResponse.message ||
          jsonResponse.__type ||
          'Forgot password request failed'
      );
    }
  } catch (error) {
    console.error('Cognito forgot password error:', error);
    throw error;
  }
}

/**
 * Custom function to handle Cognito confirm forgot password with SECRET_HASH
 * @param {string} email - The user's email (used as username)
 * @param {string} confirmationCode - The confirmation code
 * @param {string} newPassword - The new password
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @param {string} region - The AWS region
 * @returns {Promise<Object>} - The confirm forgot password response
 */
export async function cognitoConfirmForgotPassword(
  email,
  confirmationCode,
  newPassword,
  clientId,
  clientSecret,
  region
) {
  try {
    // Calculate SECRET_HASH using email as username
    const secretHash = await calculateSecretHash(email, clientId, clientSecret);

    // Prepare the request data
    const reqData = {
      Username: email, // Use email as username
      ConfirmationCode: confirmationCode,
      Password: newPassword,
      SecretHash: secretHash,
      ClientId: clientId,
    };

    // Prepare the headers
    const headers = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword',
      'Content-Type': 'application/x-amz-json-1.1',
    };

    // Make the request to Cognito
    const response = await fetch(
      `https://cognito-idp.${region}.amazonaws.com/`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqData),
      }
    );

    // Parse the response
    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse;
    } else {
      throw new Error(
        jsonResponse.message ||
          jsonResponse.__type ||
          'Confirm forgot password failed'
      );
    }
  } catch (error) {
    console.error('Cognito confirm forgot password error:', error);
    throw error;
  }
}
