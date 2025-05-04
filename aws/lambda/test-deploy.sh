#!/bin/bash
# Test script to deploy a single Lambda function

# Set variables
REGION="af-south-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "123456789012")
ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/letstalk-lambda-role"

echo "Deploying test Lambda function to $REGION..."

# Create deployment directory
mkdir -p deploy

# Function to deploy a Lambda function
deploy_function() {
    local function_name=$1
    local handler=$2
    local description=$3
    
    echo "Deploying $function_name..."
    
    # Create zip file with verbose output
    cd src/$function_name
    zip -rv ../../deploy/$function_name.zip .
    cd ../..
    
    echo "Zip file created at deploy/$function_name.zip"
    ls -la deploy/$function_name.zip
}

# Deploy test function
deploy_function "test-function" "index.handler" "Test function"

echo "Test deployment completed!"
