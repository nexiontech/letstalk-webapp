# System Architecture Overview

## Application Architecture

LetsTalk is a React-based web application that follows a modern frontend architecture with AWS services for the backend. The application is structured to be modular, maintainable, and scalable.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Application                      │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   │
│  │    React    │   │   Redux     │   │  React Router   │   │
│  │  Components │   │    Store    │   │                 │   │
│  └─────────────┘   └─────────────┘   └─────────────────┘   │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   │
│  │  Services   │   │  Utilities  │   │     Contexts    │   │
│  │             │   │             │   │                 │   │
│  └─────────────┘   └─────────────┘   └─────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       AWS Services                           │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   │
│  │   Cognito   │   │ API Gateway │   │     Lambda      │   │
│  │  User Pool  │   │             │   │   Functions     │   │
│  └─────────────┘   └─────────────┘   └─────────────────┘   │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐   │
│  │  DynamoDB   │   │     S3      │   │  CloudFront     │   │
│  │  Tables     │   │  Storage    │   │                 │   │
│  └─────────────┘   └─────────────┘   └─────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Project Structure

The frontend application follows a feature-based structure:

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── config/           # Configuration files
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
├── layouts/          # Page layout components
├── pages/            # Page components
├── services/         # API and service integrations
├── store/            # Redux store configuration
├── styles/           # Global styles
├── utils/            # Utility functions
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

### Key Components

#### Pages

Pages represent the main views of the application:

- `HomePage.jsx`: Landing page
- `LoginPage.jsx`: User authentication
- `RegisterPage.jsx`: User registration
- `DashboardPage.jsx`: User dashboard
- `UserProfilePage.jsx`: User profile management
- `ServiceIssuesPage.jsx`: Service issue reporting and tracking
- `CommunityHub.jsx`: Community engagement features

#### Layouts

Layouts provide consistent structure across pages:

- `DashboardLayout.jsx`: Layout for authenticated user pages
- `PublicLayout.jsx`: Layout for public pages

#### Components

Reusable components used throughout the application:

- `NavigationBar.jsx`: Top navigation bar
- `Footer.jsx`: Page footer
- `UserProfileForm.jsx`: Form for editing user profile
- `IdNumberInfo.jsx`: Display of ID number information

#### Services

Services handle API calls and external integrations:

- `amplifyAuthService.js`: AWS Cognito authentication
- `userProfileService.js`: User profile management
- `apiService.js`: API calls to backend services

#### Contexts

React contexts for state management:

- `AuthContext.jsx`: Authentication state and functions
- `ThemeContext.jsx`: Theme management

#### Utilities

Utility functions for common operations:

- `idNumberParser.js`: South African ID number parsing
- `authUtils.js`: Authentication utilities
- `validationUtils.js`: Form validation utilities

## Backend Architecture

The application uses AWS services for the backend:

### AWS Cognito

- User authentication and management
- User profile storage
- MFA support

### API Gateway

- RESTful API endpoints
- Request validation
- API key management

### Lambda Functions

- Serverless functions for business logic
- Event-driven architecture
- Integration with other AWS services

### DynamoDB

- NoSQL database for application data
- Scalable and highly available
- Low-latency data access

### S3

- Storage for static assets
- User uploads
- Backup storage

## Authentication Flow

```
┌──────────┐     ┌───────────┐     ┌─────────────┐
│  User    │     │  React    │     │   Cognito   │
│          │     │  App      │     │   User Pool │
└──────────┘     └───────────┘     └─────────────┘
      │                │                  │
      │  Login Form    │                  │
      │───────────────>│                  │
      │                │                  │
      │                │  Authenticate    │
      │                │─────────────────>│
      │                │                  │
      │                │  JWT Tokens      │
      │                │<─────────────────│
      │                │                  │
      │                │  Store Tokens    │
      │                │  in localStorage │
      │                │                  │
      │  Redirect to   │                  │
      │  Dashboard     │                  │
      │<───────────────│                  │
      │                │                  │
```

## Data Flow

```
┌──────────┐     ┌───────────┐     ┌─────────────┐     ┌─────────────┐
│  User    │     │  React    │     │   API       │     │  DynamoDB   │
│  Action  │     │  App      │     │   Gateway   │     │  Tables     │
└──────────┘     └───────────┘     └─────────────┘     └─────────────┘
      │                │                  │                  │
      │  User Input    │                  │                  │
      │───────────────>│                  │                  │
      │                │                  │                  │
      │                │  API Request     │                  │
      │                │  with JWT Token  │                  │
      │                │─────────────────>│                  │
      │                │                  │                  │
      │                │                  │  Query/Update    │
      │                │                  │─────────────────>│
      │                │                  │                  │
      │                │                  │  Response Data   │
      │                │                  │<─────────────────│
      │                │                  │                  │
      │                │  API Response    │                  │
      │                │<─────────────────│                  │
      │                │                  │                  │
      │                │  Update UI       │                  │
      │                │  with Redux      │                  │
      │                │                  │                  │
      │  Updated UI    │                  │                  │
      │<───────────────│                  │                  │
      │                │                  │                  │
```

## State Management

The application uses Redux for global state management:

```
┌─────────────────────────────────────────────────────────┐
│                      Redux Store                         │
│                                                         │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │
│  │    Auth     │   │    User     │   │   Issues    │   │
│  │    Slice    │   │    Slice    │   │    Slice    │   │
│  └─────────────┘   └─────────────┘   └─────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
           │                 │                 │
           ▼                 ▼                 ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Auth-related   │  │  User Profile   │  │  Issue-related  │
│  Components     │  │  Components     │  │  Components     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Deployment Architecture

The application is deployed using AWS Amplify:

```
┌─────────────────────────────────────────────────────────┐
│                      AWS Amplify                         │
│                                                         │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │
│  │    Build    │   │   Deploy    │   │   Hosting   │   │
│  │    Stage    │   │    Stage    │   │             │   │
│  └─────────────┘   └─────────────┘   └─────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
           │                 │                 │
           ▼                 ▼                 ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Source Code    │  │  CloudFront     │  │  S3 Bucket      │
│  Repository     │  │  Distribution   │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Security Architecture

The application implements several security measures:

- JWT-based authentication with AWS Cognito
- HTTPS for all communications
- Input validation on both client and server
- Content Security Policy (CSP)
- Cross-Origin Resource Sharing (CORS) configuration
- Protection against common web vulnerabilities (XSS, CSRF)

## Future Architecture Enhancements

Planned enhancements to the architecture include:

- Microservices architecture for backend services
- GraphQL API for more efficient data fetching
- WebSocket support for real-time features
- Enhanced caching strategy
- Progressive Web App (PWA) capabilities
