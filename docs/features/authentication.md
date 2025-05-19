# Authentication System

## Overview

LetsTalk uses AWS Cognito exclusively for user authentication and profile management. The system is configured to use South African ID numbers as the primary username, with additional attributes for storing user profile information.

## AWS Cognito Configuration

### User Pool Configuration

The application uses a Cognito User Pool with the following configuration:

- **User Pool ID**: Stored in environment variable `VITE_COGNITO_USER_POOL_ID`
- **Client ID**: Stored in environment variable `VITE_COGNITO_USER_POOL_WEB_CLIENT_ID`
- **Client Secret**: Stored in environment variable `VITE_COGNITO_CLIENT_SECRET`
- **Identity Pool ID**: Stored in environment variable `VITE_COGNITO_IDENTITY_POOL_ID`
- **Region**: Stored in environment variable `VITE_COGNITO_REGION`

### User Attributes

The following attributes are configured in the Cognito User Pool:

| Attribute | Description | Required |
|-----------|-------------|----------|
| `email` | User's email address | Yes |
| `name` | User's full name | Yes |
| `custom:idNumber` | South African ID number | Yes |
| `phone_number` | User's phone number | No |
| `custom:address` | User's physical address | No |

### Authentication Flow

1. **Registration**:
   - Users register with their South African ID number, email, full name, and password
   - Verification code is sent to the user's email
   - User confirms registration with the verification code

2. **Login**:
   - Users log in with their South African ID number and password
   - Upon successful authentication, tokens are stored in localStorage
   - User attributes are retrieved and stored in Redux state

3. **Password Reset**:
   - User initiates password reset with their ID number
   - Verification code is sent to the registered email
   - User sets a new password with the verification code

## Implementation Details

### Key Files

- **Configuration**: [`src/config/amplify.js`](../../src/config/amplify.js)
- **Authentication Service**: [`src/services/amplifyAuthService.js`](../../src/services/amplifyAuthService.js)
- **Auth Context**: [`src/contexts/AuthContext.jsx`](../../src/contexts/AuthContext.jsx)
- **Cognito Utilities**: [`src/utils/cognitoAuth.js`](../../src/utils/cognitoAuth.js)

### Amplify Configuration

The AWS Amplify library is configured in `src/config/amplify.js`:

```javascript
// Configure Amplify for AWS Amplify v6
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
      clientSecret: import.meta.env.VITE_COGNITO_CLIENT_SECRET,
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      loginWith: {
        username: true,  // Using ID Number as username
        email: false     // Not using email as username
      },
      signUpAttributes: ['email', 'name', 'custom:idNumber'],
      mfa: {
        status: 'optional'
      },
      userAttributes: {
        email: {
          required: true
        },
        name: {
          required: true
        },
        'custom:idNumber': {
          required: true
        }
      }
    }
  }
});
```

### Authentication Service

The authentication service (`src/services/amplifyAuthService.js`) provides Redux actions for:

- User registration
- Login
- Logout
- Password reset
- Verification code resending
- Authentication status checking
- User profile updating

### Auth Context

The Auth Context (`src/contexts/AuthContext.jsx`) provides a React context for accessing authentication state and functions throughout the application:

```javascript
// Create the context value
const contextValue = {
  user: auth.user,
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
  error: auth.error,
  registrationSuccess: auth.registrationSuccess,
  registrationMessage: auth.registrationMessage,
  passwordResetRequested: auth.passwordResetRequested,
  passwordResetMessage: auth.passwordResetMessage,
  verificationSuccess: auth.verificationSuccess,
  verificationMessage: auth.verificationMessage,
  login,
  register,
  logout,
  forgotPasswordRequest,
  confirmPasswordReset,
  clearAuthError,
  clearRegStatus,
  clearPwdResetStatus,
  clearVerifStatus
};
```

## Protected Routes

Protected routes are implemented using a `ProtectedRoute` component that checks authentication status and redirects to the login page if the user is not authenticated:

```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};
```

## Security Considerations

- Tokens are stored in localStorage for persistence
- SECRET_HASH is calculated for all Cognito operations using the client secret
- Password requirements follow AWS Cognito standards (minimum 8 characters, uppercase, lowercase, numbers, and special characters)
- User ID numbers are validated before submission

## Testing Authentication

To test the authentication system:

1. Create a test user in the AWS Cognito console
2. Use the test user credentials to log in to the application
3. Verify that protected routes are accessible
4. Test password reset functionality
5. Test registration with verification

For local development, ensure all required environment variables are set in the `.env.local` file.
