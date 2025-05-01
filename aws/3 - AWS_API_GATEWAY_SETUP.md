# AWS API Gateway Setup Guide for Let's Talk WebApp

This document outlines the steps to set up AWS API Gateway for the Let's Talk WebApp.

## Overview

API Gateway will serve as the central entry point for all backend services, providing RESTful APIs for the web application to interact with AWS Lambda functions and other backend services.

## Setup Steps

### 1. Create a New REST API

1. Sign in to the AWS Management Console
2. Navigate to API Gateway service
3. Click "Create API" and select "REST API"
4. Name it "LetsTalkAPI" and select "Regional" for endpoint type
5. Click "Create API"

### 2. Set Up Resource Structure

Create the following resource paths:

#### Authentication Endpoints
- Create resource `/auth`
  - POST `/auth/login` - User login
  - POST `/auth/register` - User registration
  - POST `/auth/confirm` - Confirm registration
  - POST `/auth/forgot-password` - Initiate password reset
  - POST `/auth/reset-password` - Complete password reset

#### User Management
- Create resource `/users`
  - GET `/users/{id}` - Get user profile
  - PUT `/users/{id}` - Update user profile
  - GET `/users/{id}/notifications` - Get user notifications

#### Service Issues
- Create resource `/issues`
  - GET `/issues` - List all issues (with filtering)
  - POST `/issues` - Create new issue
  - GET `/issues/{id}` - Get issue details
  - PUT `/issues/{id}` - Update issue
  - POST `/issues/{id}/comments` - Add comment to issue
  - GET `/issues/{id}/comments` - Get comments for issue

#### Services
- Create resource `/services`
  - GET `/services` - List available services
  - GET `/services/{id}` - Get service details
  - GET `/services/categories` - Get service categories

#### Community Hub
- Create resource `/community`
  - GET `/community/groups` - List community groups
  - POST `/community/groups` - Create community group
  - GET `/community/groups/{id}` - Get group details
  - POST `/community/groups/{id}/messages` - Post message to group
  - GET `/community/groups/{id}/messages` - Get messages from group

### 3. Configure CORS

1. For each resource, enable CORS:
   - Click on the resource
   - Click "Actions" dropdown
   - Select "Enable CORS"
   - Set "Access-Control-Allow-Origin" to your domain (use `*` for development)
   - Enable "Access-Control-Allow-Credentials"
   - Click "Enable CORS and replace existing CORS headers"

### 4. Set Up Request/Response Models

1. Create models for request validation:
   - Navigate to "Models" section
   - Create models for each request type (e.g., CreateIssueRequest, UpdateUserRequest)
   - Define JSON Schema for each model

2. Example model for creating an issue:
   ```json
   {
     "$schema": "http://json-schema.org/draft-04/schema#",
     "title": "CreateIssueRequest",
     "type": "object",
     "required": ["title", "description", "category"],
     "properties": {
       "title": { "type": "string" },
       "description": { "type": "string" },
       "category": { "type": "string" },
       "location": {
         "type": "object",
         "properties": {
           "latitude": { "type": "number" },
           "longitude": { "type": "number" }
         }
       },
       "attachments": {
         "type": "array",
         "items": { "type": "string" }
       }
     }
   }
   ```

### 5. Implement API Keys and Usage Plans

1. Create API Keys:
   - Navigate to "API Keys" section
   - Click "Create API Key"
   - Name it "LetsTalkWebAppKey"

2. Create Usage Plan:
   - Navigate to "Usage Plans" section
   - Click "Create"
   - Set rate limits (e.g., 10 requests per second)
   - Set quota (e.g., 1,000,000 requests per month)
   - Associate with the API key created earlier

### 6. Connect to Lambda Functions

1. For each endpoint, create a Lambda function:
   - Navigate to Lambda service
   - Create functions for each endpoint (e.g., `letstalk-auth-login`, `letstalk-issues-create`)

2. Connect API Gateway endpoints to Lambda:
   - In API Gateway, select the method (e.g., POST for `/issues`)
   - Set "Integration type" to "Lambda Function"
   - Select the corresponding Lambda function
   - Enable "Use Lambda Proxy integration"
   - Click "Save"

### 7. Set Up Logging and Monitoring

1. Enable CloudWatch Logs:
   - Navigate to "Stages" section
   - Select your stage (e.g., "dev", "prod")
   - Click "Logs/Tracing" tab
   - Enable "CloudWatch Logs"
   - Set log level to "INFO"

2. Enable X-Ray Tracing:
   - In the same "Logs/Tracing" tab
   - Enable "X-Ray Tracing"

3. Set up CloudWatch Alarms:
   - Navigate to CloudWatch service
   - Create alarms for:
     - 4xx errors (client errors)
     - 5xx errors (server errors)
     - Latency thresholds (e.g., > 1000ms)

### 8. Deploy the API

1. Create Stages:
   - Navigate to "Stages" section
   - Create stages for different environments (e.g., "dev", "staging", "prod")

2. Deploy API:
   - Click "Actions" dropdown
   - Select "Deploy API"
   - Select the stage to deploy to
   - Add a deployment description
   - Click "Deploy"

3. Note the Invoke URL:
   - After deployment, note the "Invoke URL" at the top of the stage editor
   - This is your API endpoint base URL

### 9. Update Environment Variables

Update your application's environment variables with the new API endpoint:

```
VITE_API_BASE_URL=https://your-api-id.execute-api.your-region.amazonaws.com/prod
```

## Security Considerations

- Implement proper authentication using AWS Cognito
- Use HTTPS for all API endpoints
- Implement request validation using models
- Use API keys for application identification
- Implement proper error handling
- Set up WAF (Web Application Firewall) for additional protection
- Regularly review CloudWatch logs for suspicious activity

## Testing

Test your API using tools like Postman or curl:

```bash
curl -X GET https://your-api-id.execute-api.your-region.amazonaws.com/prod/services \
  -H "x-api-key: your-api-key"
```

## Next Steps

After setting up API Gateway:
1. Implement Lambda functions for each endpoint
2. Set up DynamoDB tables for data storage
3. Configure proper IAM roles and policies
4. Implement proper error handling and validation