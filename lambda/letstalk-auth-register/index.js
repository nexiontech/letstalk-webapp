import { CognitoIdentityServiceProvider } from 'aws-sdk';
const cognito = new CognitoIdentityServiceProvider();

// Validate API key
const validateApiKey = (requestApiKey) => {
  const validApiKey = process.env.API_KEY;
  return requestApiKey === validApiKey;
};

export const handler = async (event) => {
  try {
    // Validate API key
    const requestApiKey = event.headers['x-api-key'];
    if (!validateApiKey(requestApiKey)) {
      return {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Invalid API key'
        })
      };
    }
    
    // Parse request body
    const body = JSON.parse(event.body);
    const { idNumber, name, email, password } = body;
    
    // Set up Cognito params
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: idNumber,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'name',
          Value: name
        },
        {
          Name: 'custom:idNumber',
          Value: idNumber
        }
      ]
    };
    
    // Register user with Cognito
    await cognito.signUp(params).promise();
    
    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Registration successful. Please check your email for verification.'
      })
    };
  } catch (error) {
    console.error('Error:', error);
    
    // Return error response
    return {
      statusCode: error.code === 'UsernameExistsException' ? 400 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: error.message || 'Internal server error'
      })
    };
  }
};
