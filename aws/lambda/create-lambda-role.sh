#!/bin/bash
# Script to create the IAM role for Lambda functions

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
ROLE_NAME="letstalk-lambda-role"
REGION="af-south-1"

echo "Creating IAM role for Lambda functions..."

# Create a temporary file for the trust policy
cat > /tmp/trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Check if role exists
if aws iam get-role --role-name $ROLE_NAME 2>&1 | grep -q "NoSuchEntity"; then
    # Create the role with trust policy
    echo "Creating new role: $ROLE_NAME"
    aws iam create-role \
        --role-name $ROLE_NAME \
        --assume-role-policy-document file:///tmp/trust-policy.json \
        --description "Role for Let's Talk Lambda functions"

    # Attach basic Lambda execution policy
    echo "Attaching AWSLambdaBasicExecutionRole policy..."
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

    # Attach DynamoDB full access policy (you may want to restrict this in production)
    echo "Attaching AmazonDynamoDBFullAccess policy..."
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

    # Attach Cognito full access policy (you may want to restrict this in production)
    echo "Attaching AmazonCognitoPowerUser policy..."
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/AmazonCognitoPowerUser

    # Wait for role to propagate
    echo "Waiting for role to propagate (10 seconds)..."
    sleep 10
else
    echo "Role $ROLE_NAME already exists"

    # Update the trust policy to ensure it's correct
    echo "Updating trust policy for $ROLE_NAME"
    aws iam update-assume-role-policy \
        --role-name $ROLE_NAME \
        --policy-document file:///tmp/trust-policy.json

    # No need to wait as long if the role already exists
    echo "Waiting for role update to propagate (5 seconds)..."
    sleep 5
fi

# Clean up
rm /tmp/trust-policy.json

# Get and display the role ARN
ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text)
echo "Role ARN: $ROLE_ARN"
echo "Use this ARN in your deploy-functions.sh script"

echo "IAM role setup completed!"
