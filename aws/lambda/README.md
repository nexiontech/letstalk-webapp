# Lambda Functions for Let's Talk Citizen App

This directory contains Lambda functions that serve as API handlers for the Let's Talk citizen application.

## Function Structure

Each Lambda function follows a similar pattern:
- Handles specific CRUD operations for a DynamoDB table
- Validates input
- Performs the requested operation
- Returns a standardized response

## Deployment

To deploy all Lambda functions:

```bash
# Make scripts executable
chmod +x create-lambda-role.sh
chmod +x create-function-dirs.sh
chmod +x deploy-functions.sh

# Create the IAM role for Lambda functions
./create-lambda-role.sh

# Create function directories with basic handlers
./create-function-dirs.sh

# Deploy all functions
./deploy-functions.sh
```

## IAM Role

The Lambda functions use an IAM role named `letstalk-lambda-role` with:
- Trust relationship allowing Lambda service to assume the role
- AWSLambdaBasicExecutionRole policy for CloudWatch Logs access
- AmazonDynamoDBFullAccess policy for DynamoDB access

## Function List

### User Management
- `letstalk-users-get` - Get user profile by ID number
- `letstalk-users-create` - Create new user profile
- `letstalk-users-update` - Update existing user profile
- `letstalk-users-delete` - Delete user profile

### Service Requests
- `letstalk-service-requests-get` - Get service request by ID
- `letstalk-service-requests-list` - List service requests with filters
- `letstalk-service-requests-create` - Create new service request
- `letstalk-service-requests-update` - Update service request status
- `letstalk-service-requests-delete` - Delete service request

### Community Messages
- `letstalk-community-messages-get` - Get message by ID
- `letstalk-community-messages-list` - List messages for a community
- `letstalk-community-messages-create` - Create new community message
- `letstalk-community-messages-delete` - Delete community message

### Notifications
- `letstalk-notifications-get` - Get notification by ID
- `letstalk-notifications-list` - List notifications for a user
- `letstalk-notifications-create` - Create new notification
- `letstalk-notifications-update` - Mark notification as read
- `letstalk-notifications-delete` - Delete notification

### Documents
- `letstalk-documents-get` - Get document metadata by ID
- `letstalk-documents-list` - List documents for a user
- `letstalk-documents-create` - Create document metadata record
- `letstalk-documents-delete` - Delete document metadata

### Test
- `test-function` - Test function for verification purposes

## Function Handler Structure

Each function uses a standard handler structure:

```javascript
exports.handler = async (event) => {
    try {
        // Log the event for debugging
        console.log('Event:', JSON.stringify(event, null, 2));

        // TODO: Implement actual functionality

        // Return successful response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // For CORS support
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                message: 'Function executed successfully',
                functionName: 'function-name'
            })
        };
    } catch (error) {
        console.error('Error:', error);

        // Return error response
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // For CORS support
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                message: 'Internal server error',
                error: error.message
            })
        };
    }
};
```

## Scripts

### create-lambda-role.sh

Creates the IAM role for Lambda functions with the necessary permissions and trust relationship.

### create-function-dirs.sh

Creates source directories for all Lambda functions with basic handler code.

### deploy-functions.sh

Deploys all Lambda functions to AWS by:
1. Checking if the IAM role exists and has the correct trust relationship
2. Creating a ZIP file for each function
3. Creating or updating the Lambda function in AWS

## Next Steps

1. Implement actual functionality in each Lambda function
2. Set up API Gateway to expose these functions as REST APIs
3. Configure DynamoDB tables for application data
4. Test the functions with sample events
5. Set up monitoring with CloudWatch alarms
6. Implement CI/CD for automated deployments

## AWS Region

All functions are deployed to the `af-south-1` (Cape Town) region.

## Authentication

Authentication is handled separately through AWS Cognito. These Lambda functions expect to receive authenticated requests through API Gateway with user information available in the request context.