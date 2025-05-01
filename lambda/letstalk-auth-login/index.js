const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { idNumber, password } = body;
    
    // Set up Cognito params
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: idNumber,
        PASSWORD: password
      }
    };
    
    // Initiate auth with Cognito
    const authResult = await cognito.initiateAuth(params).promise();
    
    // Get user attributes
    const userParams = {
      AccessToken: authResult.AuthenticationResult.AccessToken
    };
    const userInfo = await cognito.getUser(userParams).promise();
    
    // Format user data
    const user = {
      idNumber: idNumber,
      email: userInfo.UserAttributes.find(attr => attr.Name === 'email')?.Value || '',
      name: userInfo.UserAttributes.find(attr => attr.Name === 'name')?.Value || ''
    };
    
    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: authResult.AuthenticationResult.IdToken,
        user: user
      })
    };
  } catch (error) {
    console.error('Error:', error);
    
    // Return error response
    return {
      statusCode: error.code === 'NotAuthorizedException' ? 401 : 500,
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