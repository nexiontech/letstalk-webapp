#!/bin/bash
# AWS CloudShell script to set up Cognito in Cape Town region

# Set variables
REGION="af-south-1"
USER_POOL_NAME="letstalk-citizen-webapp"
CLIENT_NAME="letstalk-citizen-webapp-client"
CALLBACK_URL="http://localhost:5173/dashboard"
SIGNOUT_URL="http://localhost:5173/"
DOMAIN_PREFIX="letstalk-citizen-webapp"

echo "Creating Cognito User Pool in $REGION..."

# Create User Pool with username as the primary sign-in attribute
# (we'll use ID Number as the username)
USER_POOL_ID=$(aws cognito-idp create-user-pool \
  --region $REGION \
  --pool-name $USER_POOL_NAME \
  --auto-verified-attributes "email" \
  --schema '[
    {"Name":"email","Required":true,"Mutable":true},
    {"Name":"name","Required":true,"Mutable":true}
  ]' \
  --query 'UserPool.Id' \
  --output text)

echo "User Pool created with ID: $USER_POOL_ID"

# Add custom attribute for ID Number (not required, we'll use username instead)
aws cognito-idp add-custom-attributes \
  --region $REGION \
  --user-pool-id $USER_POOL_ID \
  --custom-attributes '[
    {"Name":"idNumber","AttributeDataType":"String","Mutable":false,"StringAttributeConstraints":{"MinLength":"13","MaxLength":"13"}}
  ]'

echo "Added custom attribute 'idNumber'"

# Create App Client
CLIENT_ID=$(aws cognito-idp create-user-pool-client \
  --region $REGION \
  --user-pool-id $USER_POOL_ID \
  --client-name $CLIENT_NAME \
  --generate-secret \
  --refresh-token-validity 30 \
  --access-token-validity 1 \
  --id-token-validity 1 \
  --token-validity-units "AccessToken=hours,IdToken=hours,RefreshToken=days" \
  --explicit-auth-flows "ALLOW_USER_PASSWORD_AUTH" "ALLOW_REFRESH_TOKEN_AUTH" \
  --callback-urls $CALLBACK_URL \
  --logout-urls $SIGNOUT_URL \
  --allowed-o-auth-flows "code" "implicit" \
  --allowed-o-auth-scopes "email" "openid" "profile" \
  --supported-identity-providers "COGNITO" \
  --query 'UserPoolClient.ClientId' \
  --output text)

# Get the client secret
CLIENT_SECRET=$(aws cognito-idp describe-user-pool-client \
  --region $REGION \
  --user-pool-id $USER_POOL_ID \
  --client-id $CLIENT_ID \
  --query 'UserPoolClient.ClientSecret' \
  --output text)

echo "App Client created with ID: $CLIENT_ID"
echo "Client Secret: $CLIENT_SECRET"

# Create domain
aws cognito-idp create-user-pool-domain \
  --region $REGION \
  --user-pool-id $USER_POOL_ID \
  --domain $DOMAIN_PREFIX

echo "Domain created: $DOMAIN_PREFIX.auth.$REGION.amazoncognito.com"

# Output configuration for .env.local
echo ""
echo "Add these values to your .env.local file:"
echo "VITE_COGNITO_REGION=$REGION"
echo "VITE_COGNITO_USER_POOL_ID=$USER_POOL_ID"
echo "VITE_COGNITO_USER_POOL_WEB_CLIENT_ID=$CLIENT_ID"
echo "VITE_COGNITO_DOMAIN=https://$DOMAIN_PREFIX.auth.$REGION.amazoncognito.com"
