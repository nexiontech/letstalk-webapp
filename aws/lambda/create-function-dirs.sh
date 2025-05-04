#!/bin/bash
# Script to create Lambda function source directories with basic handler code

# Create src directory if it doesn't exist
mkdir -p src

# Function to create a Lambda function directory with basic handler
create_function_dir() {
    local function_name=$1
    local description=$2

    echo "Creating source directory for $function_name..."

    # Create directory
    mkdir -p "src/$function_name"

    # Create basic handler file
    cat > "src/$function_name/index.js" << EOF
/**
 * $description
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} - API Gateway Lambda Proxy Output Format
 */
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
                functionName: '$function_name'
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
EOF

    # Create package.json file
    cat > "src/$function_name/package.json" << EOF
{
  "name": "$function_name",
  "version": "1.0.0",
  "description": "$description",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "Let's Talk Team",
  "license": "ISC",
  "dependencies": {
    "aws-sdk": "^2.1467.0"
  }
}
EOF

    echo "Created $function_name with basic handler and package.json"
}

# Create test function
create_function_dir "test-function" "Test function"

# Create Authentication functions
create_function_dir "letstalk-auth-register" "Register new user in Cognito"
create_function_dir "letstalk-auth-login" "Authenticate user and return tokens"
create_function_dir "letstalk-auth-refresh" "Refresh authentication tokens"
create_function_dir "letstalk-auth-verify" "Verify user account"
create_function_dir "letstalk-auth-forgot-password" "Initiate forgot password flow"
create_function_dir "letstalk-auth-reset-password" "Reset user password"

# Create User functions
create_function_dir "letstalk-users-get" "Get user profile by ID number"
create_function_dir "letstalk-users-create" "Create new user profile"
create_function_dir "letstalk-users-update" "Update existing user profile"
create_function_dir "letstalk-users-delete" "Delete user profile"

# Create Service Request functions
create_function_dir "letstalk-service-requests-get" "Get service request by ID"
create_function_dir "letstalk-service-requests-list" "List service requests with filters"
create_function_dir "letstalk-service-requests-create" "Create new service request"
create_function_dir "letstalk-service-requests-update" "Update service request status"
create_function_dir "letstalk-service-requests-delete" "Delete service request"

# Create Community Message functions
create_function_dir "letstalk-community-messages-get" "Get message by ID"
create_function_dir "letstalk-community-messages-list" "List messages for a community"
create_function_dir "letstalk-community-messages-create" "Create new community message"
create_function_dir "letstalk-community-messages-delete" "Delete community message"

# Create Notification functions
create_function_dir "letstalk-notifications-get" "Get notification by ID"
create_function_dir "letstalk-notifications-list" "List notifications for a user"
create_function_dir "letstalk-notifications-create" "Create new notification"
create_function_dir "letstalk-notifications-update" "Mark notification as read"
create_function_dir "letstalk-notifications-delete" "Delete notification"

# Create Document functions
create_function_dir "letstalk-documents-get" "Get document metadata by ID"
create_function_dir "letstalk-documents-list" "List documents for a user"
create_function_dir "letstalk-documents-create" "Create document metadata record"
create_function_dir "letstalk-documents-delete" "Delete document metadata"

echo "All Lambda function directories created successfully!"
