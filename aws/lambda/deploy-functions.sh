#!/bin/bash
# Script to deploy all Lambda functions for Let's Talk app

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed or not in PATH."
    echo "Please install the AWS CLI and configure it with appropriate credentials."
    echo "Visit https://aws.amazon.com/cli/ for installation instructions."
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "Error: AWS CLI is not configured with valid credentials."
    echo "Please run 'aws configure' to set up your AWS credentials."
    exit 1
fi

# Set variables
REGION="af-south-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ROLE_NAME="letstalk-lambda-role"
ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

echo "Deploying Lambda functions to $REGION..."

# Verify the role exists and can be assumed by Lambda
if ! aws iam get-role --role-name $ROLE_NAME &>/dev/null; then
    echo "Error: IAM role $ROLE_NAME does not exist."
    echo "Please run the create-lambda-role.sh script first to create the role."
    exit 1
fi

# Check if the role has the correct trust relationship
TRUST_POLICY=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.AssumeRolePolicyDocument' --output json)
if ! echo "$TRUST_POLICY" | grep -q "lambda.amazonaws.com"; then
    echo "Error: IAM role $ROLE_NAME does not trust the Lambda service."
    echo "Please run the create-lambda-role.sh script to fix the trust relationship."
    exit 1
fi

echo "Using IAM role: $ROLE_ARN"

# Create deployment directories
mkdir -p deploy
mkdir -p deploy_temp

# Clean up any existing temporary files
if [ -d "deploy_temp" ]; then
    rm -rf deploy_temp/*
fi

# Check if shared directory exists
if [ ! -d "src/shared" ]; then
    echo "Warning: Shared directory src/shared does not exist."
    echo "Lambda functions will be deployed without shared code."
else
    echo "Found shared directory. Shared code will be included in all Lambda functions."
fi

# Function to deploy a Lambda function
deploy_function() {
    local function_name=$1
    local handler=$2
    local description=$3

    echo "Deploying $function_name..."

    # Check if source directory exists
    if [ ! -d "src/$function_name" ]; then
        echo "Warning: Source directory src/$function_name does not exist. Skipping..."
        return
    fi

    # Check if source directory is empty
    if [ -z "$(ls -A src/$function_name 2>/dev/null)" ]; then
        echo "Warning: Source directory src/$function_name is empty. Skipping..."
        return
    fi

    # Create zip file
    mkdir -p deploy_temp/$function_name

    # Copy function files
    cp -r src/$function_name/* deploy_temp/$function_name/

    # Copy shared files
    if [ -d "src/shared" ]; then
        cp -r src/shared/* deploy_temp/$function_name/
    fi

    # Install dependencies if package.json exists
    if [ -f "deploy_temp/$function_name/package.json" ]; then
        cd deploy_temp/$function_name
        npm install --production
        cd ../..
    else
        echo "Warning: No package.json found for $function_name"
    fi

    # Create zip file
    cd deploy_temp/$function_name
    zip -r ../../deploy/$function_name.zip .
    cd ../..

    # Check if function exists
    if aws lambda get-function --function-name $function_name --region $REGION 2>&1 | grep -q "Function not found"; then
        # Create function
        aws lambda create-function \
            --region $REGION \
            --function-name $function_name \
            --zip-file fileb://deploy/$function_name.zip \
            --handler $handler \
            --runtime nodejs18.x \
            --role $ROLE_ARN \
            --description "$description" \
            --timeout 10 \
            --memory-size 128 \
            --environment "Variables={REGION=$REGION}" \
            --tags "Environment=Demo,Project=LetsTalk"
    else
        # Update function
        aws lambda update-function-code \
            --region $REGION \
            --function-name $function_name \
            --zip-file fileb://deploy/$function_name.zip
    fi
}

# Deploy test function (for testing purposes)
deploy_function "test-function" "index.handler" "Test function"

# Deploy Authentication functions
deploy_function "letstalk-auth-register" "index.handler" "Register new user in Cognito"
deploy_function "letstalk-auth-login" "index.handler" "Authenticate user and return tokens"
deploy_function "letstalk-auth-refresh" "index.handler" "Refresh authentication tokens"
deploy_function "letstalk-auth-verify" "index.handler" "Verify user account"
deploy_function "letstalk-auth-forgot-password" "index.handler" "Initiate forgot password flow"
deploy_function "letstalk-auth-reset-password" "index.handler" "Reset user password"

# Deploy User functions
deploy_function "letstalk-users-get" "index.handler" "Get user profile by ID number"
deploy_function "letstalk-users-create" "index.handler" "Create new user profile"
deploy_function "letstalk-users-update" "index.handler" "Update existing user profile"
deploy_function "letstalk-users-delete" "index.handler" "Delete user profile"

# Deploy Service Request functions
deploy_function "letstalk-service-requests-get" "index.handler" "Get service request by ID"
deploy_function "letstalk-service-requests-list" "index.handler" "List service requests with filters"
deploy_function "letstalk-service-requests-create" "index.handler" "Create new service request"
deploy_function "letstalk-service-requests-update" "index.handler" "Update service request status"
deploy_function "letstalk-service-requests-delete" "index.handler" "Delete service request"

# Deploy Community Message functions
deploy_function "letstalk-community-messages-get" "index.handler" "Get message by ID"
deploy_function "letstalk-community-messages-list" "index.handler" "List messages for a community"
deploy_function "letstalk-community-messages-create" "index.handler" "Create new community message"
deploy_function "letstalk-community-messages-delete" "index.handler" "Delete community message"

# Deploy Notification functions
deploy_function "letstalk-notifications-get" "index.handler" "Get notification by ID"
deploy_function "letstalk-notifications-list" "index.handler" "List notifications for a user"
deploy_function "letstalk-notifications-create" "index.handler" "Create new notification"
deploy_function "letstalk-notifications-update" "index.handler" "Mark notification as read"
deploy_function "letstalk-notifications-delete" "index.handler" "Delete notification"

# Deploy Document functions
deploy_function "letstalk-documents-get" "index.handler" "Get document metadata by ID"
deploy_function "letstalk-documents-list" "index.handler" "List documents for a user"
deploy_function "letstalk-documents-create" "index.handler" "Create document metadata record"
deploy_function "letstalk-documents-delete" "index.handler" "Delete document metadata"

# Clean up temporary files
if [ -d "deploy_temp" ]; then
    echo "Cleaning up temporary files..."
    rm -rf deploy_temp
fi

echo "All Lambda functions deployed successfully!"