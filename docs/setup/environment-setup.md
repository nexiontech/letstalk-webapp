# Environment Setup Guide

## Prerequisites

Before setting up the LetsTalk application, ensure you have the following installed:

- Node.js (v16.x or later)
- npm (v8.x or later)
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-organization/letstalk.git

# Navigate to the project directory
cd letstalk

# Switch to the changes branch
git checkout changes
```

### 2. Install Dependencies

```bash
# Install project dependencies
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```
# AWS Cognito Configuration
VITE_COGNITO_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxx
VITE_COGNITO_USER_POOL_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Other Configuration
VITE_APP_STAGE=development
```

Contact the development team lead to obtain the actual values for these environment variables.

### 4. Start the Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## AWS Configuration

### AWS Cognito Setup

To set up AWS Cognito for the application:

1. Create a User Pool in the AWS Console
2. Configure the User Pool with the following attributes:
   - Username: ID Number (custom:idNumber)
   - Required attributes: email, name
   - Custom attributes: custom:idNumber, custom:address
3. Create an App Client for the User Pool
4. Create an Identity Pool and link it to the User Pool
5. Update the environment variables with the Cognito configuration

### AWS Amplify Setup

To deploy the application using AWS Amplify:

1. Install the AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure the Amplify CLI:
   ```bash
   amplify configure
   ```

3. Initialize Amplify in the project:
   ```bash
   amplify init
   ```

4. Add authentication to the project:
   ```bash
   amplify add auth
   ```

5. Push the configuration to AWS:
   ```bash
   amplify push
   ```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific tests
npm test -- src/utils/__tests__/idNumberParser.test.js

# Run tests with coverage
npm test -- --coverage
```

### Testing Authentication

To test authentication locally:

1. Create a test user in the AWS Cognito console
2. Use the test user credentials to log in to the application
3. Verify that protected routes are accessible
4. Test password reset functionality
5. Test registration with verification

## Linting and Formatting

The project uses ESLint and Prettier for code linting and formatting:

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## Building for Production

```bash
# Build the application for production
npm run build

# Preview the production build locally
npm run preview
```

The production build will be available in the `dist` directory.

## Deployment

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to AWS S3 (if configured)
npm run deploy
```

### CI/CD Deployment

The project uses GitHub Actions for CI/CD:

1. Push changes to the `changes` branch
2. GitHub Actions will run tests and linting
3. If all checks pass, the changes can be merged to `main`
4. Pushing to `main` triggers automatic deployment to the production environment

## Troubleshooting

### Common Issues

1. **Authentication Issues**:
   - Ensure Cognito configuration is correct in `.env.local`
   - Check browser console for authentication errors
   - Verify user exists in Cognito User Pool

2. **Build Errors**:
   - Clear the `node_modules` directory and reinstall dependencies
   - Check for conflicting dependencies
   - Ensure Node.js version is compatible

3. **API Connection Issues**:
   - Verify API URL and key in `.env.local`
   - Check CORS configuration on the API
   - Ensure API is accessible from your network

### Getting Help

If you encounter issues not covered in this guide:

1. Check the project's GitHub Issues
2. Contact the development team lead
3. Refer to the AWS documentation for Cognito and Amplify issues
