# AWS Services Setup Guide for Let's Talk WebApp

This document outlines the AWS services that need to be set up and configured for the Let's Talk WebApp to function properly in a production environment.

## Current Status

The application currently has partial integration with AWS Cognito for authentication. Other AWS services mentioned in the application requirements have not been fully implemented yet.

## Required AWS Services

### 1. AWS Cognito (Partially Implemented)

**Current Status**: Basic configuration exists, but needs to be completed and properly integrated.

**To Do**:
- Complete the User Pool setup as outlined in `AWS_COGNITO_SETUP.md`
- Configure custom attributes for South African ID numbers
- Set up proper email verification and password reset flows
- Configure MFA (Multi-Factor Authentication) for enhanced security
- Set up proper IAM roles and policies for the Cognito User Pool
- Update callback URLs for production environments
- Implement proper error handling for authentication flows

### 2. AWS Amplify Hosting

**Current Status**: Not implemented. The application is currently running locally.

**To Do**:
- Create an Amplify app in the AWS Management Console
- Connect the GitHub repository to Amplify
- Configure build settings:
  ```yaml
  version: 1
  frontend:
    phases:
      preBuild:
        commands:
          - npm ci
      build:
        commands:
          - npm run build
    artifacts:
      baseDirectory: dist
      files:
        - '**/*'
    cache:
      paths:
        - node_modules/**/*
  ```
- Set up environment variables in the Amplify console
- Configure custom domains and SSL certificates
- Set up branch-based deployments for development, staging, and production

### 3. AWS API Gateway

**Current Status**: Not implemented. The application is currently using mock data.

**To Do**:
- Create a new API in API Gateway
- Set up resource paths for different endpoints:
  - `/auth` - Authentication endpoints
  - `/users` - User management endpoints
  - `/services` - Service-related endpoints
  - `/issues` - Service issue reporting and tracking
  - `/community` - Community hub related endpoints
- Configure proper CORS settings
- Set up request/response models
- Implement API keys and usage plans
- Connect API Gateway to Lambda functions
- Set up proper logging and monitoring

### 4. AWS Lambda

**Current Status**: Not implemented.

**To Do**:
- Create Lambda functions for backend logic:
  - Authentication handlers
  - User profile management
  - Service issue reporting and tracking
  - Community hub messaging
  - Notification processing
- Set up proper IAM roles for Lambda functions
- Configure environment variables
- Set up proper error handling and logging
- Implement connection to DynamoDB for data persistence
- Set up CloudWatch alarms for monitoring

### 5. Amazon DynamoDB

**Current Status**: Not implemented. The application is currently using mock data.

**To Do**:
- Design and create DynamoDB tables:
  - Users table
  - ServiceIssues table
  - Communities table
  - Messages table
  - Notifications table
- Set up proper indexes for efficient querying
- Configure auto-scaling
- Implement backup and recovery strategies
- Set up proper IAM policies for table access

### 6. Amazon S3

**Current Status**: Not implemented.

**To Do**:
- Create S3 buckets for:
  - User profile pictures
  - Service issue attachments (photos, documents)
  - Community hub shared files
  - Application static assets (if not using Amplify hosting)
- Configure proper CORS settings
- Set up lifecycle policies for object expiration
- Implement proper bucket policies and IAM roles
- Configure CloudFront distribution for content delivery (optional)

### 7. Amazon SNS/SQS

**Current Status**: Not implemented.

**To Do**:
- Set up SNS topics for notifications:
  - Service issue updates
  - Community announcements
  - System notifications
- Configure SQS queues for asynchronous processing
- Implement proper subscription filters
- Set up dead-letter queues for failed messages
- Configure proper IAM policies

### 8. Amazon CloudWatch

**Current Status**: Not implemented.

**To Do**:
- Set up CloudWatch dashboards for monitoring
- Configure alarms for:
  - API Gateway errors
  - Lambda function errors
  - DynamoDB throttling
  - S3 access patterns
- Set up log groups for application logs
- Configure metrics and custom metrics
- Set up automated notifications for critical issues

### 9. AWS IAM

**Current Status**: Not implemented.

**To Do**:
- Create proper IAM roles for:
  - Cognito authenticated users
  - Lambda execution
  - S3 access
  - DynamoDB access
- Implement least privilege principle
- Set up proper policies for each service
- Configure cross-service permissions
- Implement proper key rotation policies

### 10. Amazon Pinpoint (for Notifications)

**Current Status**: Not implemented.

**To Do**:
- Set up Amazon Pinpoint project
- Configure email and SMS channels
- Set up notification templates
- Implement campaign management
- Configure proper IAM roles and policies
- Integrate with the application for user notifications

### 11. AWS AppSync (for Real-time Features)

**Current Status**: Not implemented.

**To Do**:
- Create AppSync API for real-time features:
  - Community hub messaging
  - Service issue status updates
  - Notifications
- Configure GraphQL schema
- Set up resolvers to connect to DynamoDB
- Implement proper authentication and authorization
- Configure subscription endpoints for real-time updates

## Implementation Priority

1. **AWS Cognito** - Complete the authentication system
2. **AWS Amplify Hosting** - Set up proper hosting environment
3. **AWS API Gateway & Lambda** - Implement backend API functionality
4. **Amazon DynamoDB** - Set up data persistence
5. **Amazon S3** - Implement file storage
6. **Amazon SNS/SQS** - Set up notification system
7. **AWS AppSync** - Implement real-time features
8. **Amazon Pinpoint** - Set up advanced notification capabilities
9. **AWS CloudWatch** - Implement monitoring and alerting
10. **AWS IAM** - Refine security policies

## Environment Variables

The following environment variables need to be configured in the production environment:

```
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com

# AWS Cognito Configuration
VITE_COGNITO_REGION=your-region
VITE_COGNITO_USER_POOL_ID=your-user-pool-id
VITE_COGNITO_USER_POOL_WEB_CLIENT_ID=your-client-id
VITE_COGNITO_DOMAIN=your-domain.auth.your-region.amazoncognito.com

# AWS S3 Configuration
VITE_S3_BUCKET_REGION=your-region
VITE_S3_BUCKET_NAME=your-bucket-name

# Feature Flags
VITE_ENABLE_THUSONG_AI=true
VITE_ENABLE_PAYMENTS=true
```

## Security Considerations

- Implement proper CORS policies for all API endpoints
- Use HTTPS for all communications
- Implement proper authentication and authorization for all API endpoints
- Use AWS WAF to protect against common web exploits
- Implement proper input validation on both client and server side
- Use AWS Shield for DDoS protection
- Implement proper logging and monitoring for security events
- Regularly rotate access keys and credentials
- Use AWS Secrets Manager for sensitive configuration values
- Implement proper error handling to prevent information leakage

## Monitoring and Maintenance

- Set up CloudWatch dashboards for monitoring application health
- Configure alarms for critical metrics
- Implement proper logging for debugging and auditing
- Set up automated backups for DynamoDB tables
- Implement CI/CD pipelines for automated testing and deployment
- Regularly update dependencies to address security vulnerabilities
- Implement proper error tracking and reporting
- Set up performance monitoring and optimization

## Cost Optimization

- Use AWS Free Tier where possible
- Implement auto-scaling for resources based on demand
- Use reserved instances for predictable workloads
- Implement lifecycle policies for S3 objects
- Monitor and optimize DynamoDB read/write capacity
- Use CloudFront for content delivery to reduce data transfer costs
- Implement proper caching strategies
- Regularly review and optimize AWS resource usage
