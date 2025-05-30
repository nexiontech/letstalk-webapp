# Let's Talk - Comprehensive Documentation

**Version:** 1.0
**Last Updated:** May 2025
**Project:** Let's Talk Citizen WebApp

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Architecture](#architecture)
   - [System Overview](#system-overview)
   - [Project Structure](#project-structure)
   - [Key Components](#key-components)
4. [Features](#features)
   - [Authentication System](#authentication-system)
   - [User Profile Management](#user-profile-management)
   - [South African ID Number Parser](#south-african-id-number-parser)
   - [Service Issue Reporting](#service-issue-reporting)
   - [Community Hub](#community-hub)
5. [Development](#development)
   - [Environment Setup](#environment-setup)
   - [Git Workflow](#git-workflow)
   - [Feature Implementation Guide](#feature-implementation-guide)
   - [Testing](#testing)
6. [Deployment](#deployment)
7. [API Reference](#api-reference)
8. [Troubleshooting](#troubleshooting)
9. [Contributing](#contributing)

---

## Overview

Let's Talk is a comprehensive community service platform designed to bridge the gap between South African citizens and government services. The application provides a centralized interface for citizens to interact with municipal services, report issues, track service delivery, and engage with their communities.

### Purpose

The Let's Talk platform aims to:

- Provide a user-friendly interface for citizens to report and track service issues
- Enable real-time updates on service delivery and municipal activities
- Offer secure online payment options for utilities and services
- Create a community hub for citizen engagement and communication
- Facilitate access to government services, permits, and official documents

### Target Audience

- **Primary**: Citizens of municipalities using the Let's Talk platform
- **Secondary**: Municipal service providers and administrators
- **Tertiary**: Community leaders and organizers

### Key Features

- **User Authentication & Profile Management** via AWS Cognito Identity Pool
- **Service Issue Reporting & Tracking** with mock data and tracking interface
- **Community Hub** for large group messaging and interaction
- **Government Services Access** including permits and document applications with payment interface
- **Utility Payment System** for electricity, water, and municipal rates *(Mock Implementation)*
- **Intelligent Chatbot** with Thusong AI Assistant using rule-based responses
- **South African ID Number Integration** with automatic information extraction and validation

### Current Implementation Status

**Fully Functional Features:**
- ✅ User Authentication & Profile Management (AWS Cognito)
- ✅ South African ID Number Parser & Validation
- ✅ Dashboard with Weather Integration
- ✅ Thusong AI Chatbot (Rule-based responses)
- ✅ User Profile Management with ID Information Display
- ✅ Responsive Design & Navigation

**Mock/Prototype Features:**
- 🔄 Service Issue Reporting (Interface functional, uses mock data)
- 🔄 Community Hub (Interface implemented, awaiting backend integration)
- 🔄 Government Services & Payment System (Mock payment flow)
- 🔄 Utility Bill Management (Mock data and payment interface)

**In Development:**
- 🚧 Real-time Service Updates
- 🚧 Backend API Integration
- 🚧 Actual Payment Processing
- 🚧 Real Community Messaging System

### Technology Stack

- **Frontend Framework**: React 18.3.1 with Vite 6.3.3
- **UI Library**: Material UI 7.0.2 with custom theming
- **State Management**: Redux Toolkit 2.7.0
- **Routing**: React Router DOM 7.5.1
- **Authentication**: AWS Cognito with Amplify 6.14.3
- **Backend Services**: AWS (API Gateway, Lambda, DynamoDB) - *In Development*
- **Deployment**: AWS Amplify - *Configured*
- **Testing**: Jest 29.7.0 with React Testing Library 14.3.1
- **Styling**: CSS with Material UI components, Bootstrap 5.3.6, and FontAwesome 6.7.2

---

## 🔍 SEO Optimization

Let's Talk is comprehensively optimized for search engines with enterprise-grade SEO implementation:

### SEO Features Implemented

**Technical SEO:**
- Complete meta tag optimization (title, description, keywords, robots)
- Open Graph and Twitter Card meta tags for social media sharing
- Structured data (JSON-LD) for rich snippets and enhanced search results
- XML sitemap with proper priority and change frequency settings
- Robots.txt with comprehensive crawling guidelines
- Canonical URLs to prevent duplicate content issues
- Hreflang tags for South African English localization

**Content SEO:**
- Dynamic page titles and descriptions for each route
- SEO-optimized headings structure (H1-H6)
- Keyword-rich content focused on South African market
- FAQ structured data for featured snippets
- Service pages with detailed descriptions and benefits
- Location-based content for major South African cities

**Performance SEO:**
- Core Web Vitals monitoring and optimization
- Page load time tracking and analytics
- Image optimization and lazy loading
- Preconnect and DNS prefetch for critical resources
- Mobile-first responsive design
- Progressive Web App (PWA) capabilities

**Local SEO (South African Focus):**
- Geo-targeted content for South African users
- Local business structured data
- Municipality-specific service information
- South African English language optimization
- Regional keyword targeting for major cities

**Analytics & Monitoring:**
- Google Analytics 4 integration with enhanced ecommerce
- Google Search Console verification ready
- SEO performance tracking and reporting
- User behavior analytics for SEO insights
- Conversion tracking for government service interactions

### SEO Configuration

The SEO system is centrally managed through `src/config/seoConfig.js` with:
- Page-specific meta tag configurations
- Structured data templates
- Performance monitoring settings
- Local SEO parameters for South Africa
- Content guidelines and optimization rules

### Domain & Branding

- **Primary Domain:** letstalkbi.co.za
- **Company:** Saya-Setona (saya-setona.co.za)
- **Target Market:** South African citizens and government services
- **Language:** English (South African variant - en-ZA)
- **Geographic Focus:** All 9 provinces of South Africa

---

## Quick Start

### Prerequisites

- Node.js (v18.x or higher)
- npm (v8.x or higher)
- Git
- AWS Account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/saya-setona/letstalk-webapp.git
cd letstalk-webapp

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run test suite
- `npm run format` - Format code with Prettier

---

## Architecture

### System Overview

Let's Talk is a React-based web application that follows a modern frontend architecture with AWS services for the backend. The application is structured to be modular, maintainable, and scalable.

#### High-Level Architecture

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

### Project Structure

The frontend application follows a feature-based structure:

```
letstalk-webapp/
├── public/                 # Static assets
├── src/                    # Application source code
│   ├── assets/             # Component-specific assets (images, etc.)
│   ├── components/         # Reusable UI components
│   │   ├── AuthForms.css
│   │   ├── ComingSoonModal.jsx
│   │   ├── Footer.jsx
│   │   ├── IdNumberInfo.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── NavigationBar.jsx
│   │   ├── UserProfileForm.jsx
│   │   └── weather/
│   ├── config/             # Configuration files
│   │   └── amplify.js
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx
│   │   └── LanguageContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useWeather.js
│   ├── layouts/            # Page layout components
│   │   └── DashboardLayout.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── UserProfilePage.jsx
│   │   ├── ServiceIssuesPage.jsx
│   │   ├── ReportIssuePage.jsx
│   │   ├── CommunityHub.jsx
│   │   ├── GovernmentServicesPage.jsx
│   │   ├── UtilitiesPage.jsx
│   │   ├── ThusongAIChatbot.jsx
│   │   ├── AboutUsPage.jsx
│   │   ├── FAQPage.jsx
│   │   └── ...
│   ├── services/           # API and service integrations
│   │   ├── amplifyAuthService.js
│   │   ├── authService.js
│   │   ├── locationService.js
│   │   ├── userProfileService.js
│   │   └── weatherService.js
│   ├── store/              # Redux store configuration
│   │   ├── features/
│   │   └── store.js
│   ├── styles/             # Global styles
│   │   └── global.css
│   ├── utils/              # Utility functions
│   │   ├── __tests__/
│   │   ├── authUtils.js
│   │   ├── cognitoAuth.js
│   │   ├── generateValidIdNumber.js
│   │   ├── idNumberParser.js
│   │   ├── jwtDecode.js
│   │   ├── secretHash.js
│   │   └── weatherUtils.js
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── babel.config.js         # Babel configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── jest.config.js          # Jest configuration
├── package.json            # NPM package configuration
├── README.md               # Project README
└── vite.config.js          # Vite configuration
```

### Key Components

#### Pages
Pages represent the main views of the application:

- `HomePage.jsx`: Landing page with service overview and personalized greetings
- `LoginPage.jsx`: User authentication interface with ID number login
- `RegisterPage.jsx`: User registration with ID number validation
- `DashboardPage.jsx`: Personalized user dashboard with weather, alerts, and quick actions
- `UserProfilePage.jsx`: Profile management and ID information display
- `ServiceIssuesPage.jsx`: Service issue reporting and tracking interface
- `ReportIssuePage.jsx`: Issue reporting form with location services
- `CommunityHub.jsx`: Community messaging and engagement platform
- `GovernmentServicesPage.jsx`: Government services access with payment interface
- `UtilitiesPage.jsx`: Utility bill management and payment interface *(Note: redirects to /services)*
- `ThusongAIChatbot.jsx`: AI assistant chatbot component with rule-based responses
- `AboutUsPage.jsx`: Information about the platform and organization
- `FAQPage.jsx`: Frequently asked questions and help documentation

#### Layouts
Layouts provide consistent structure across pages:

- `DashboardLayout.jsx`: Layout for authenticated user pages with sidebar navigation and header

#### Components
Reusable components used throughout the application:

- `NavigationBar.jsx`: Top navigation with user profile and logout
- `Footer.jsx`: Application footer with links and information
- `UserProfileForm.jsx`: Form for editing user profile information
- `IdNumberInfo.jsx`: Display of parsed South African ID number information
- `ComingSoonModal.jsx`: Modal for features under development
- `LanguageSelector.jsx`: Multi-language support component
- `WeatherWidget.jsx`: Weather information display component (in weather/ subdirectory)

#### Services
Services handle API calls and external integrations:

- `amplifyAuthService.js`: AWS Cognito authentication operations
- `userProfileService.js`: User profile management and updates
- `locationService.js`: GPS and address location services
- `weatherService.js`: Weather data integration
- `authService.js`: Authentication utilities and token management

#### Contexts
React contexts for state management:

- `AuthContext.jsx`: Authentication state and functions
- `LanguageContext.jsx`: Multi-language support and translations

#### Utilities
Utility functions for common operations:

- `idNumberParser.js`: South African ID number parsing and validation
- `authUtils.js`: Authentication helper functions
- `cognitoAuth.js`: AWS Cognito integration utilities
- `jwtDecode.js`: JWT token decoding and validation
- `secretHash.js`: AWS Cognito secret hash generation
- `weatherUtils.js`: Weather data processing utilities

## Features

### Authentication System

Let's Talk uses AWS Cognito exclusively for user authentication and profile management. The system is configured to use South African ID numbers as the primary username, with additional attributes for storing user profile information.

#### AWS Cognito Configuration

**User Pool Configuration:**
The application uses a Cognito User Pool with the following configuration:

- **User Pool ID**: Stored in environment variable `VITE_COGNITO_USER_POOL_ID`
- **Client ID**: Stored in environment variable `VITE_COGNITO_USER_POOL_WEB_CLIENT_ID`
- **Client Secret**: Stored in environment variable `VITE_COGNITO_CLIENT_SECRET`
- **Identity Pool ID**: Stored in environment variable `VITE_COGNITO_IDENTITY_POOL_ID`
- **Region**: Stored in environment variable `VITE_COGNITO_REGION`

**User Attributes:**
The following attributes are configured in the Cognito User Pool:

| Attribute | Description | Required |
|-----------|-------------|----------|
| `email` | User's email address | Yes |
| `name` | User's full name | Yes |
| `custom:idNumber` | South African ID number | Yes |
| `phone_number` | User's phone number | No |
| `custom:address` | User's physical address | No |

#### Authentication Flow

1. **Registration**:
   - Users register with their South African ID number, email, full name, and password
   - ID number is validated using the built-in parser
   - Verification code is sent to the user's email
   - User confirms registration with the verification code

2. **Login**:
   - Users log in with their South African ID number and password
   - Upon successful authentication, JWT tokens are stored in localStorage
   - User attributes are retrieved and stored in Redux state

3. **Password Reset**:
   - User initiates password reset with their ID number
   - Verification code is sent to the registered email
   - User sets a new password with the verification code

#### Implementation Details

**Key Files:**
- **Configuration**: `src/config/amplify.js`
- **Authentication Service**: `src/services/amplifyAuthService.js`
- **Auth Context**: `src/contexts/AuthContext.jsx`
- **Cognito Utilities**: `src/utils/cognitoAuth.js`

**Amplify Configuration:**
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
      userAttributes: {
        email: { required: true },
        name: { required: true },
        'custom:idNumber': { required: true }
      }
    }
  }
});
```

#### Protected Routes

Protected routes are implemented using a `ProtectedRoute` component that checks authentication status:

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

#### Security Considerations

- JWT tokens are stored in localStorage for persistence
- SECRET_HASH is calculated for all Cognito operations using the client secret
- Password requirements follow AWS Cognito standards (minimum 8 characters, uppercase, lowercase, numbers, and special characters)
- User ID numbers are validated before submission using the South African ID number parser

### User Profile Management

The User Profile Management feature allows users to view and edit their personal information. It integrates with AWS Cognito for authentication and profile data storage, and includes the South African ID number parser to automatically extract and display additional information from the user's ID number.

#### Features

- View and edit personal information
- Automatic extraction of information from South African ID numbers
- Form validation for user inputs
- Error handling for API calls
- Integration with AWS Cognito for data storage

#### Implementation

**Key Files:**
- **Profile Page**: `src/pages/UserProfilePage.jsx`
- **Profile Form**: `src/components/UserProfileForm.jsx`
- **ID Number Info**: `src/components/IdNumberInfo.jsx`
- **Profile Service**: `src/services/userProfileService.js`
- **ID Number Parser**: `src/utils/idNumberParser.js`

**User Profile Page Structure:**
```jsx
<Paper elevation={3} className="profile-paper">
  <Typography variant="h2" className="section-title">
    <FontAwesomeIcon icon={faIdCard} className="section-icon" />
    ID Information
  </Typography>
  <Typography variant="body1" className="section-description">
    Information extracted from your South African ID number
  </Typography>

  {user?.idNumber && <IdNumberInfo idNumber={user.idNumber} />}
</Paper>

<Paper elevation={3} className="profile-paper">
  <Typography variant="h2" className="section-title">
    <FontAwesomeIcon icon={faUser} className="section-icon" />
    Personal Information
  </Typography>
  <Typography variant="body1" className="section-description">
    Update your personal information and contact details
  </Typography>

  <UserProfileForm
    user={user}
    onUpdateSuccess={handleUpdateSuccess}
    onUpdateError={handleUpdateError}
  />
</Paper>
```

#### Form Validation

The User Profile Form includes validation for:

- Name (required)
- Email (required, valid format)
- Phone number (valid format if provided)

```javascript
const validateForm = () => {
  const errors = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate phone number if provided
  if (formData.phoneNumber && !/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
```

#### Navigation and Access

The user profile page is accessible through:

1. The dashboard sidebar user profile section
2. The "My Profile" link in the sidebar footer
3. Direct navigation to `/profile` (protected route)

### Service Issue Reporting

The Service Issue Reporting feature allows users to report and track municipal service issues such as water outages, power failures, road damage, and other infrastructure problems. The system provides an intuitive interface for submitting issues with location data and tracking their resolution status.

#### Features

- Report various types of municipal service issues
- Location-based issue reporting with GPS integration
- Issue tracking and status updates
- Mock data implementation for demonstration purposes
- Integration with community alerts and notifications

#### Implementation

**Key Files:**
- **Service Issues Page**: `src/pages/ServiceIssuesPage.jsx`
- **Report Issue Page**: `src/pages/ReportIssuePage.jsx`
- **Location Service**: `src/services/locationService.js`

**Current Status:**
The service issue reporting system is implemented with mock data for demonstration purposes. The interface allows users to:
- View existing service issues in their area
- Report new issues with descriptions and location data
- Track issue status and resolution progress
- Receive notifications about service disruptions

### Community Hub

The Community Hub serves as a platform for large group messaging and community engagement. It provides a space for citizens to communicate with each other and stay informed about local events and announcements.

#### Features

- Community messaging and discussions
- Event announcements and calendar
- Local news and updates
- Community resource sharing
- Integration with municipal communications

#### Implementation

**Key Files:**
- **Community Hub Page**: `src/pages/CommunityHub.jsx`
- **Community Hub Styles**: `src/pages/CommunityHub.css`

**Current Status:**
The Community Hub is implemented as a functional interface that provides:
- Community discussion areas
- Event listings and announcements
- Resource sharing capabilities
- Integration with the overall platform authentication system

### Thusong AI Chatbot

The Thusong AI Chatbot is an intelligent assistant that helps users navigate the platform and find information about government services. It uses rule-based responses to provide helpful guidance and support.

#### Features

- Interactive chat interface with rule-based responses
- Contextual help for platform navigation
- Information about government services and procedures
- Suggested questions for common inquiries
- Minimizable chat widget available on all pages

#### Implementation

**Key Files:**
- **Chatbot Component**: `src/pages/ThusongAIChatbot.jsx`
- **Chatbot Styles**: `src/pages/ThusongAIChatbot.css`

**Technical Details:**
```javascript
const generateAIResponse = userMessage => {
  const lowerCaseMessage = userMessage.toLowerCase();

  // Rule-based response system
  if (lowerCaseMessage.includes('pay bills')) {
    return 'To pay your bills, navigate to the Dashboard page...';
  } else if (lowerCaseMessage.includes('report issue')) {
    return 'To report an issue, go to the Dashboard and click on "Report an Issue"...';
  }
  // Additional response patterns
};
```

**Current Status:**
The chatbot is fully functional with:
- Rule-based response system for common queries
- Interactive chat interface with typing indicators
- Suggested questions for user guidance
- Integration across all platform pages
- Mobile-responsive design with minimization capability

### South African ID Number Parser

The South African ID Number Parser is a utility that extracts and validates information from South African ID numbers. It is used in the user profile page to automatically display additional user information based on their ID number.

#### South African ID Number Structure

South African ID numbers follow a specific 13-digit structure (YYMMDDSSSSCAZ):

1. **Date of Birth (YYMMDD - first 6 digits)**:
   - Year (YY): 00-99
   - Month (MM): 01-12
   - Day (DD): 01-31

2. **Gender (SSSS - digits 7-10)**:
   - 0000-4999 = Female
   - 5000-9999 = Male

3. **Citizenship Status (C - digit 11)**:
   - 0 = South African citizen
   - 1 = Permanent resident

4. **Race Classification (A - digit 12)**:
   - Historical digit, no longer used for classification
   - Not displayed in the application

5. **Checksum (Z - digit 13)**:
   - Validation digit calculated using the Luhn algorithm

#### Implementation

**Key Files:**
- **Parser Utility**: `src/utils/idNumberParser.js`
- **Display Component**: `src/components/IdNumberInfo.jsx`
- **Test File**: `src/utils/__tests__/idNumberParser.test.js`
- **Test Utility**: `src/utils/generateValidIdNumber.js`

#### Parser Functions

**1. Validation**
```javascript
export const validateIdNumberChecksum = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13 || !/^\d+$/.test(idNumber)) {
    return false;
  }

  // South African ID number uses a modified Luhn algorithm
  let sum = 0;

  // Process each digit
  for (let i = 0; i < 12; i++) {
    let digit = parseInt(idNumber.charAt(i), 10);

    // Double every second digit (odd positions)
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  // Calculate the check digit (last digit)
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  const providedCheckDigit = parseInt(idNumber.charAt(12), 10);

  return calculatedCheckDigit === providedCheckDigit;
};
```

**2. Date of Birth Extraction**
```javascript
export const extractDateOfBirth = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13) {
    return { valid: false, error: 'Invalid ID number format' };
  }

  try {
    const year = idNumber.substring(0, 2);
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);

    // Determine century: 00-29 = 2000s, 30-99 = 1900s
    const fullYear = parseInt(year, 10) < 30 ? `20${year}` : `19${year}`;

    // Create date object
    const dateObj = new Date(`${fullYear}-${month}-${day}`);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return { valid: false, error: 'Invalid date in ID number' };
    }

    // Format date and calculate age
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedDate = `${parseInt(day, 10)} ${monthNames[dateObj.getMonth()]} ${fullYear}`;
    const age = calculateAge(dateObj);

    return {
      valid: true,
      dateObj,
      formattedDate,
      day: parseInt(day, 10),
      month: parseInt(month, 10),
      monthName: monthNames[dateObj.getMonth()],
      year: parseInt(fullYear, 10),
      age
    };
  } catch (error) {
    return { valid: false, error: 'Error parsing date of birth' };
  }
};
```

**3. Gender Extraction**
```javascript
export const extractGender = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13) {
    return { valid: false, error: 'Invalid ID number format' };
  }

  try {
    const genderDigits = parseInt(idNumber.substring(6, 10), 10);
    const gender = genderDigits < 5000 ? 'Female' : 'Male';

    return {
      valid: true,
      gender,
      genderCode: genderDigits
    };
  } catch (error) {
    return { valid: false, error: 'Error parsing gender information' };
  }
};
```

**4. Citizenship Extraction**
```javascript
export const extractCitizenship = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string' || idNumber.length !== 13) {
    return { valid: false, error: 'Invalid ID number format' };
  }

  try {
    const citizenshipDigit = parseInt(idNumber.charAt(10), 10);
    const status = citizenshipDigit === 0 ? 'South African Citizen' : 'Permanent Resident';

    return {
      valid: true,
      citizenshipStatus: status,
      citizenshipCode: citizenshipDigit
    };
  } catch (error) {
    return { valid: false, error: 'Error parsing citizenship information' };
  }
};
```

#### Display Component

The `IdNumberInfo` component displays the extracted information in a user-friendly format:

```jsx
return (
  <div className="id-number-info">
    <div className="id-info-section">
      <h3>ID Number Details</h3>
      <div className="id-info-grid">
        <div className="id-info-item">
          <span className="id-info-label">ID Number:</span>
          <span className="id-info-value">{idInfo.formattedIdNumber}</span>
        </div>

        <div className="id-info-item">
          <span className="id-info-label">Date of Birth:</span>
          <span className="id-info-value">{idInfo.dateOfBirth.formattedDate}</span>
        </div>

        <div className="id-info-item">
          <span className="id-info-label">Age:</span>
          <span className="id-info-value">{idInfo.dateOfBirth.age} years</span>
        </div>

        <div className="id-info-item">
          <span className="id-info-label">Gender:</span>
          <span className="id-info-value">{idInfo.gender.gender}</span>
        </div>

        <div className="id-info-item">
          <span className="id-info-label">Citizenship:</span>
          <span className="id-info-value">{idInfo.citizenship.citizenshipStatus}</span>
        </div>
      </div>
    </div>
  </div>
);
```

#### Testing

The ID number parser is thoroughly tested using Jest. The test file includes tests for:

- Validating checksums
- Extracting date of birth
- Extracting gender
- Extracting citizenship status
- Handling edge cases and errors

A utility function (`generateValidIdNumber.js`) is provided to generate valid South African ID numbers for testing purposes.

#### Security Considerations

- The ID number parser does not store or transmit ID numbers
- ID numbers are only displayed to the authenticated user
- The race classification digit is not used or displayed
- The parser validates ID numbers to ensure they are properly formatted

## Development

### Environment Setup

#### Prerequisites

Before setting up the Let's Talk application, ensure you have the following installed:

- Node.js (v18.x or higher)
- npm (v8.x or higher)
- Git
- AWS Account (for deployment)

#### Local Development Setup

**1. Clone the Repository**

```bash
# Clone the repository
git clone https://github.com/saya-setona/letstalk-webapp.git

# Navigate to the project directory
cd letstalk-webapp

# Switch to the develop branch (main development branch)
git checkout develop
```

**2. Install Dependencies**

```bash
# Install project dependencies
npm install
```

**3. Environment Configuration**

Create a `.env.local` file in the root directory with the following variables:

```bash
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

**4. Start the Development Server**

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

#### AWS Configuration

**AWS Cognito Setup:**

To set up AWS Cognito for the application:

1. Create a User Pool in the AWS Console
2. Configure the User Pool with the following attributes:
   - Username: ID Number (custom:idNumber)
   - Required attributes: email, name
   - Custom attributes: custom:idNumber, custom:address
3. Create an App Client for the User Pool
4. Create an Identity Pool and link it to the User Pool
5. Update the environment variables with the Cognito configuration

**AWS Amplify Setup:**

To deploy the application using AWS Amplify:

```bash
# Install the AWS Amplify CLI
npm install -g @aws-amplify/cli

# Configure the Amplify CLI
amplify configure

# Initialize Amplify in the project
amplify init

# Add authentication to the project
amplify add auth

# Push the configuration to AWS
amplify push
```

#### Testing

**Running Tests:**
```bash
# Run all tests
npm test

# Run specific tests
npm test -- src/utils/__tests__/idNumberParser.test.js

# Run tests with coverage
npm test -- --coverage
```

**Testing Authentication:**

To test authentication locally:

1. Create a test user in the AWS Cognito console
2. Use the test user credentials to log in to the application
3. Verify that protected routes are accessible
4. Test password reset functionality
5. Test registration with verification

#### Security

**Dependency Security Management:**

The application implements comprehensive security monitoring:

```bash
# Run security audit
npm run security:audit

# Fix automatically fixable vulnerabilities
npm run security:fix

# Check for high-severity vulnerabilities only
npm run security:check
```

**Security Features:**

- **Automated Vulnerability Scanning**: Integrated npm audit and dependency-check
- **Dependency Suppression**: Documented risk assessment for false positives
- **Regular Updates**: Monthly dependency security reviews
- **Security Policy**: Comprehensive vulnerability management process

**Current Security Status:**

✅ **0 vulnerabilities** found in npm audit
✅ **All critical dependencies** up to date
✅ **Bootstrap carousel vulnerabilities** properly assessed and suppressed (component not used)

See [SECURITY-POLICY.md](./security/SECURITY-POLICY.md) for detailed security information.

#### Linting and Formatting

The project uses ESLint and Prettier for code linting and formatting:

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

#### Building for Production

```bash
# Build the application for production
npm run build

# Preview the production build locally
npm run preview
```

The production build will be available in the `dist` directory.

### Git Workflow

#### Overview

develop

#### Branch Structure

**Main Branches:**
- **`main`**: Production-ready code that has been deployed
- **`develop`**: Integration branch for features and fixes before they are merged to `main`

**Feature Branches:**
Feature branches are created from the `develop` branch and follow a specific naming convention:

```
<type>/<ticket-number>-<description>
```

Where:
- `<type>` is one of:
  - `feature/`: New features
  - `fix/`: Bug fixes
  - `refactor/`: Code refactoring without changing functionality
  - `test/`: Adding or modifying tests
  - `chore/`: Maintenance tasks, dependency updates, etc.
- `<ticket-number>` is the JIRA ticket number (e.g., LT-123)
- `<description>` is a brief, kebab-case description of the change

Examples:
- `feature/LT-200-user-profile`
- `fix/LT-100-general-app-improvements`
- `docs/LT-150-api-documentation`

#### Workflow

**1. Create a Feature Branch**

Start by creating a new branch from the `develop` branch:

```bash
# Ensure you're on the develop branch
git checkout develop

# Pull the latest changes
git pull

# Create a new feature branch
git checkout -b feature/LT-123-new-feature
```

**2. Develop and Test**

Develop the feature or fix in isolation, making regular commits:

```bash
# Make changes to files
...

# Stage changes
git add <files>

# Commit changes with a descriptive message
git commit -m "feature: implement new functionality

- Add component X
- Update service Y
- Fix issue Z"
```

Commit messages should follow this format:
- First line: Brief summary of the change (type: description)
- Blank line
- Bullet points with details of the changes

**3. Push to Remote**

Push your branch to the remote repository:

```bash
git push origin feature/LT-123-new-feature
```

**4. Merge to Develop Branch**

Once the feature is complete and tested, merge it back to the `develop` branch:

```bash
# Switch to the develop branch
git checkout develop

# Pull the latest changes
git pull

# Merge the feature branch
git merge feature/LT-123-new-feature

# Push the updated changes branch
git push origin develop
```

**5. Clean Up**

After the feature branch has been merged, delete it:

```bash
# Delete the local branch
git branch -d feature/LT-123-new-feature

# Delete the remote branch
git push origin --delete feature/LT-123-new-feature
```

#### Best Practices

1. **Keep branches short-lived**: Feature branches should be merged back to `develop` as soon as possible
2. **Pull regularly**: Keep your local `develop` branch up to date by pulling regularly
3. **Commit often**: Make small, focused commits with clear messages
4. **Test before merging**: Ensure all tests pass before merging to `develop`
5. **Resolve conflicts promptly**: Address merge conflicts as soon as they arise
6. **Use descriptive branch names**: Follow the naming convention to make it clear what each branch is for
7. **Clean up old branches**: Delete branches after they've been merged

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

1. Push changes to the `develop` branch
2. GitHub Actions will run tests and linting
3. If all checks pass, the changes can be merged to `main`
4. Pushing to `main` triggers automatic deployment to the production environment

---

## Troubleshooting

### Common Issues

#### Authentication Issues

**Problem**: Users cannot log in or registration fails
**Solutions**:
- Ensure Cognito configuration is correct in `.env.local`
- Check browser console for authentication errors
- Verify user exists in Cognito User Pool
- Confirm ID number format is valid (13 digits)
- Check SECRET_HASH calculation

#### Build Errors

**Problem**: Application fails to build or start
**Solutions**:
- Clear the `node_modules` directory and reinstall dependencies:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Check for conflicting dependencies
- Ensure Node.js version is compatible (v18.x or higher)
- Verify all environment variables are set correctly

#### API Connection Issues

**Problem**: API calls fail or return errors
**Solutions**:
- Verify API URL and key in `.env.local`
- Check CORS configuration on the API
- Ensure API is accessible from your network
- Check JWT token validity and expiration
- Verify AWS Cognito user pool configuration

#### ID Number Parser Issues

**Problem**: ID number validation fails or returns incorrect information
**Solutions**:
- Ensure ID number is exactly 13 digits
- Verify the checksum calculation using the Luhn algorithm
- Check for valid date components (month 01-12, day 01-31)
- Confirm the ID number follows South African format

#### Performance Issues

**Problem**: Application loads slowly or becomes unresponsive
**Solutions**:
- Check browser developer tools for performance bottlenecks
- Optimize large components with React.memo or useMemo
- Implement code splitting for large bundles
- Check for memory leaks in useEffect hooks
- Optimize image sizes and formats

### Getting Help

If you encounter issues not covered in this guide:

1. Check the project's GitHub Issues for similar problems
2. Search the AWS Cognito documentation for authentication issues
3. Review the React and Vite documentation for build issues
4. Contact the development team lead for project-specific questions
5. Check the browser console for detailed error messages

### Debug Mode

To enable debug mode for additional logging:

```bash
# Set debug environment variable
VITE_DEBUG=true npm run dev
```

This will enable additional console logging for:
- Authentication flows
- API requests and responses
- ID number parsing operations
- Redux state changes

---

## Contributing

### Code Standards

Before contributing to the project, please review our coding standards:

#### JavaScript/React Standards

- Use functional components with hooks instead of class components
- Follow ESLint configuration for code style
- Use meaningful variable and function names
- Write JSDoc comments for complex functions
- Implement proper error handling and user feedback
- Use TypeScript-style prop validation with PropTypes

#### File Organization

- Group related files in appropriate directories
- Use kebab-case for file names
- Keep components small and focused on single responsibility
- Extract reusable logic into custom hooks
- Separate business logic from UI components

#### Testing Requirements

- Write unit tests for all utility functions
- Test React components with React Testing Library
- Achieve minimum 80% code coverage
- Test both happy paths and error scenarios
- Mock external dependencies in tests

#### Git Commit Standards

Follow conventional commit format:

```
<type>(<scope>): <description>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create Feature Branch**: Follow the git workflow outlined above
2. **Implement Changes**: Make your changes following the coding standards
3. **Write Tests**: Ensure adequate test coverage for new code
4. **Update Documentation**: Update relevant documentation files
5. **Run Quality Checks**:
   ```bash
   npm run lint
   npm run format
   npm test
   npm run build
   ```
6. **Create Pull Request**: Submit PR with clear description and screenshots if applicable
7. **Address Feedback**: Respond to code review comments and make necessary changes
8. **Merge**: Once approved, merge using the standard git workflow

### Development Environment

Ensure your development environment is properly configured:

- Use the latest LTS version of Node.js
- Install recommended VS Code extensions for React development
- Configure your editor to use the project's ESLint and Prettier settings
- Set up pre-commit hooks to run linting and formatting

### Code Review Guidelines

When reviewing code:

- Check for adherence to coding standards
- Verify test coverage and quality
- Ensure proper error handling
- Review security implications
- Test the changes locally
- Provide constructive feedback

### Documentation Updates

When making changes that affect documentation:

- Update inline code comments
- Update relevant markdown files in the `/docs` directory
- Update this comprehensive documentation file
- Include screenshots for UI changes
- Update API documentation if applicable

---

## Contact and Support

For questions, support, or contributions:

- **Project Repository**: [GitHub - Let's Talk WebApp](https://github.com/saya-setona/letstalk-webapp)
- **Development Team**: Contact the project maintainers through GitHub issues
- **Documentation Issues**: Report documentation problems via GitHub issues
- **Security Issues**: Report security vulnerabilities privately to the development team

---

**Document Information:**
- **Created**: May 2025
- **Last Updated**: May 2025
- **Version**: 1.0
- **Maintained By**: Yashiel Sookdeo (yashiel@skyner.co.za)