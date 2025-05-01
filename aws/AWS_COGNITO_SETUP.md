# AWS Cognito Setup Guide

This guide will walk you through setting up AWS Cognito for the Let's Talk Citizen WebApp.

## Prerequisites

- An AWS account
- AWS CLI installed and configured (optional, but helpful)
- Basic understanding of AWS services

## Step 1: Create a Cognito User Pool

1. Sign in to the AWS Management Console and navigate to the Cognito service
2. Click "Create user pool"
3. For sign-in options, select "Email" and "User name" (since we'll be using South African ID Number as username)
4. Under "Required attributes", select "email" and "name"
5. For password policy, you can use the default or customize based on your security requirements
6. For MFA, you can choose "Optional MFA" if you want to provide that option to users
7. For user account recovery, select "Enable self-service account recovery" and "Email only"
8. For the app client:
   - Name it "letstalk-citizen-webapp"
   - Select "Generate a client secret" (for server-side authentication)
   - Set the callback URL to "http://localhost:5173/dashboard" for development
   - Set the sign-out URL to "http://localhost:5173/"
   - Under "Advanced app client settings", select "Authorization code grant" and "Implicit grant"
   - For allowed OAuth scopes, select "email", "openid", and "profile"
9. Review and create the user pool

## Step 2: Add Custom Attribute for ID Number

1. Go to your newly created user pool
2. Navigate to "User Pool Properties" > "Schema attributes"
3. Click "Add custom attribute"
4. Name it "idNumber"
5. Set data type to "String"
6. Set min length to 13 and max length to 13 (South African ID numbers are 13 digits)
7. Make it required
8. Save changes

## Step 3: Configure Hosted UI

1. Go to your user pool
2. Navigate to "App integration" > "App client settings"
3. Find your app client and configure:
   - Domain name: Choose a domain prefix for your Cognito hosted UI (e.g., "letstalk-citizen-webapp")
   - Identity providers: Check "Cognito User Pool"
   - Callback URLs: Add "http://localhost:5173/dashboard"
   - Sign out URLs: Add "http://localhost:5173/"
   - OAuth 2.0 grant types: Select "Authorization code grant" and "Implicit grant"
   - OAuth 2.0 scopes: Select "email", "openid", and "profile"
4. Save changes

## Step 4: Get Configuration Values

After setting up your user pool, you'll need these values for your application:

1. User Pool ID: Found in the "General settings" of your user pool
2. App Client ID: Found in "App integration" > "App clients and analytics"
3. Region: The AWS region where you created your user pool (e.g., "us-east-1")
4. Domain: The domain you configured for the hosted UI

## Step 5: Configure Your Application

1. Create a `.env.local` file in the project root with the following content:
   ```
   VITE_COGNITO_REGION=your-region
   VITE_COGNITO_USER_POOL_ID=your-user-pool-id
   VITE_COGNITO_USER_POOL_WEB_CLIENT_ID=your-app-client-id
   VITE_COGNITO_DOMAIN=your-domain.auth.your-region.amazoncognito.com
   ```
2. Replace the placeholders with your actual values from Step 4
3. Save the file

## Step 6: Run Your Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:5173` in your web browser
3. Test the authentication flow:
   - Register a new user
   - Verify the user's email
   - Log in with the user's credentials
   - Test password reset functionality

## Troubleshooting

### Common Issues

1. **User not confirmed error**: This occurs when a user tries to sign in before verifying their email. The application should handle this by showing a verification dialog.

2. **Invalid client ID**: Make sure the client ID in your `.env.local` file matches the one in your Cognito user pool.

3. **CORS errors**: If you're getting CORS errors, make sure your Cognito domain is properly configured and your callback URLs are correct.

4. **Redirect URI mismatch**: The callback URL in your Cognito settings must exactly match the one used in your application.

### Testing

You can use the AWS CLI to test your Cognito setup:

```bash
aws cognito-idp admin-create-user --user-pool-id YOUR_USER_POOL_ID --username testuser --user-attributes Name=email,Value=test@example.com Name=name,Value="Test User" Name=custom:idNumber,Value=1234567890123
```

This will create a test user in your user pool.

## Production Considerations

For production deployment:

1. Update the callback URLs in your Cognito settings to use your production domain
2. Consider enabling additional security features like MFA
3. Set up proper IAM roles and policies for your Cognito user pool
4. Configure proper email settings for verification and password reset emails
5. Consider using AWS WAF to protect your Cognito endpoints from attacks
