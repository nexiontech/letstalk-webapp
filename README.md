# Let's Talk - Citizen WebApp

## Overview

This project is the citizen-facing Web Application for the "Let's Talk" platform. It provides a centralized interface for citizens to interact with government services, submit inquiries, receive updates, track service delivery, make payments, and communicate via a community hub.

This web application is built using ReactJS and Vite, connecting to a shared backend infrastructure powered by AWS services. It is part of a larger suite including mobile applications and a municipality portal.

### Project Purpose

The Let's Talk platform aims to bridge the gap between citizens and government services by providing:

- A user-friendly interface for citizens to report and track service issues
- Real-time updates on service delivery and municipal activities
- Secure online payment options for utilities and services
- A community hub for citizen engagement and communication
- Access to government services, permits, and official documents

### Target Audience

- Citizens of municipalities using the Let's Talk platform
- Municipal service providers and administrators
- Community leaders and organizers

## Features (Planned)

*   User Authentication & Profile Management (via AWS Cognito Identity Pool)
*   Heatmap visualization of service delivery (Geofencing)
*   Reporting and tracking of new service issues & receiving notifications
*   Online payments for utilities (Electricity, Water, Rates)
*   Viewing details of Municipality and Parliamentary Meetings (Streams, Recordings, Transcriptions)
*   Live updates on the status of service delivery requests
*   Accessing and applying for Permits (e.g., Sassa Grants)
*   AI-powered search across municipal policies and documents
*   Community Hub for large group messaging and interaction
*   Viewing official Press Releases

## Technology Stack

### Core Technologies
*   **Framework:** ReactJS (v18.3.1)
*   **Build Tool:** Vite (v6.2.0)
*   **Routing:** React Router DOM (v7.4.1)
*   **UI Library:** Material UI (v7.0.1) with custom theme
*   **State Management:** Redux Toolkit (v2.6.1)
*   **API Communication:** Fetch API (native), planned integration with AWS Amplify

### Styling
*   **CSS Framework:** Custom CSS with Material UI components
*   **CSS Variables:** Global variables defined in `src/styles/global.css`
*   **Theming:** Custom Material UI theme in `src/theme.js`
*   **Icons:** Font Awesome (v6.7.2) and Material UI Icons

### Additional Libraries
*   **Bootstrap:** v5.3.3 (for certain components)
*   **Emotion:** For styled components with Material UI

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js:** Version 18.x or higher required. Download [Node.js](https://nodejs.org/)
*   **npm:** Comes bundled with Node.js.
*   **Git:** For cloning the repository. Download [Git](https://git-scm.com/)
*   **Code Editor:** VS Code recommended with the following extensions:
    * ESLint
    * Prettier
    * React Developer Tools
*   **Browser:** Latest version of Chrome, Firefox, or Edge with React Developer Tools extension

## Getting Started

Follow these steps to get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saya-setona/letstalk-webapp.git
    cd letstalk-webapp
    ```

2.  **Checkout the develop branch:**
    ```bash
    git checkout develop
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up LocalStack for AWS service emulation:**

    Prerequisites:
    - Docker and Docker Compose installed
    - AWS CLI installed and configured

    Start LocalStack:
    ```bash
    docker-compose up -d
    ```

    Initialize LocalStack services:
    ```bash
    ./init-localstack.sh
    ```

    Populate mock data (optional):
    ```bash
    node scripts/populate-mock-data.js
    ```

5.  **Environment Variables:**
    *   Create a `.env.local` file in the project root (this file is gitignored).
    *   Add variables prefixed with `VITE_` as needed.
    *   Required environment variables:
        ```
        # API Configuration
        VITE_API_BASE_URL=http://localhost:4566/restapis/your-api-id/dev/_user_request_

        # AWS LocalStack Configuration
        VITE_AWS_REGION=us-east-1
        VITE_AWS_ENDPOINT=http://localhost:4566
        VITE_USE_LOCALSTACK=true

        # AWS Cognito Configuration (for real Cognito)
        VITE_COGNITO_REGION=us-east-1
        VITE_COGNITO_USER_POOL_ID=your-user-pool-id
        VITE_COGNITO_USER_POOL_WEB_CLIENT_ID=your-client-id
        VITE_COGNITO_IDENTITY_POOL_ID=your-identity-pool-id
        VITE_COGNITO_CLIENT_SECRET=your-client-secret
        VITE_COGNITO_DOMAIN=your-cognito-domain

        # Feature Flags
        VITE_ENABLE_THUSONG_AI=false
        VITE_ENABLE_PAYMENTS=false
        ```
    *   Note: For development with LocalStack, you can use mock values for Cognito configuration.

6.  **Run the development server:**
    ```bash
    npm run dev
    ```

7.  **Open the application:**
    *   Navigate to `http://localhost:5173` (or the port specified in the terminal output) in your web browser.

8.  **Verify LocalStack services:**
    *   Check that the application can connect to LocalStack services:
        ```bash
        aws --endpoint-url=http://localhost:4566 dynamodb list-tables
        aws --endpoint-url=http://localhost:4566 s3 ls
        aws --endpoint-url=http://localhost:4566 apigateway get-rest-apis
        ```

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode with hot-reloading.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the code using ESLint to check for code quality and style issues.
*   `npm run preview`: Serves the production build locally to preview before deployment.
*   `npm run localstack:start`: Starts the LocalStack Docker container.
*   `npm run localstack:stop`: Stops the LocalStack Docker container.
*   `npm run localstack:init`: Initializes the LocalStack services (creates DynamoDB tables, S3 buckets, Lambda functions, etc.).
*   `npm run localstack:verify`: Verifies that the LocalStack services are running correctly.
*   `npm run dev:local`: Starts the LocalStack container, initializes services, and runs the development server.

## Testing

The project uses Jest and React Testing Library for testing. To run tests:

1. Make sure you have all dependencies installed:
   ```bash
   npm install
   ```

2. Run the test suite:
   ```bash
   npm test
   ```

3. Run tests with coverage report:
   ```bash
   npm test -- --coverage
   ```

### Testing Configuration

Tests are configured to run in a jsdom environment, which simulates a browser-like environment. The testing setup includes:

* **Jest**: Test runner and assertion library
* **React Testing Library**: Component testing utilities
* **jest-environment-jsdom**: Browser API simulation
* **@testing-library/jest-dom**: Additional DOM matchers

### Test File Structure

Test files should be placed alongside the components they test with a `.test.js` or `.spec.js` extension:

```
src/
├── components/
│   ├── Button.jsx
│   └── Button.test.jsx
```

### Testing Best Practices

1. Focus on testing component behavior, not implementation details
2. Use React Testing Library's queries (getBy, findBy, queryBy) to select elements
3. Test user interactions using fireEvent or userEvent
4. Mock API calls and external dependencies
5. Write tests that resemble how users interact with the application

## Project Structure
```
letstalk-webapp/
├── public/ # Static assets
├── src/ # Application source code
│ ├── assets/ # Component-specific assets (images, etc.)
│ ├── components/ # Reusable UI components (e.g., NavigationBar, Button)
│ │ ├── common/ # Shared components used across multiple pages
│ │ ├── layout/ # Layout components (headers, footers, etc.)
│ │ └── feature/ # Feature-specific components
│ ├── contexts/ # React Context providers (e.g., LanguageContext)
│ ├── hooks/ # Custom React Hooks
│ ├── pages/ # Top-level page components (routed views)
│ │ ├── HomePage.jsx # Landing page
│ │ ├── LoginPage.jsx # Authentication page
│ │ ├── ServiceIssuesPage.jsx # Service issues listing
│ │ ├── ReportIssuePage.jsx # Issue reporting form
│ │ └── ... # Other page components
│ ├── services/ # API interaction logic (e.g., authService, issueService)
│ ├── store/ # Redux state management
│ │ ├── store.js # Redux store configuration
│ │ └── features/ # Redux slices for different features
│ │     └── counter/ # Example feature slice
│ │         └── counterSlice.js # Example reducer and actions
│ ├── styles/ # Global styles, themes
│ │ └── global.css # Global CSS variables and styles
│ ├── theme.js # Material UI theme configuration
│ ├── translations/ # Internationalization files
│ │ └── index.js # Translation strings for different languages
│ ├── utils/ # Utility functions
│ ├── App.jsx # Root component, main layout, routing setup
│ ├── main.jsx # Application entry point
│ └── index.css # Global CSS resets/base styles
├── .env.local # Local environment variables (Gitignored)
├── eslint.config.js # ESLint configuration
├── babel.config.js # Babel configuration for transpilation
├── jest.config.js # Jest testing configuration
├── .gitignore # Git ignore rules
├── index.html # HTML template
├── package.json # Project dependencies and scripts
├── README.md # This file
└── vite.config.js # Vite configuration
```

### Key Files and Directories

- **src/main.jsx**: Application entry point that sets up React with Redux, Router, and Material UI
- **src/App.jsx**: Main component with route definitions and layout structure
- **src/theme.js**: Material UI theme customization with color palette and component styling
- **src/styles/global.css**: Global CSS variables and base styles
- **src/contexts/LanguageContext.js**: Context provider for multi-language support
- **src/translations/index.js**: Translation strings for different languages
## Development Workflow

### Branch Strategy

We follow a modified GitFlow branching strategy with the following branches:

#### Long-lived Branches
- **production**: Main stable branch containing production-ready code
  - Direct commits are prohibited
  - Changes are merged via pull requests from the `develop` branch
  - Each merge to production triggers a deployment to the production environment

- **develop**: Integration branch for features and fixes
  - All feature work must be merged here first
  - Changes are merged via pull requests from feature branches
  - Each merge to develop triggers a deployment to the staging environment

#### Short-lived Branches
Create these branches only when needed for specific changes, then merge and delete them:

- **feature/LT-XXX-descriptive-name**: For new features or enhancements
  - Created from: `develop`
  - Merged to: `develop`
  - Example: `feature/LT-45-add-payment-gateway`
  - Example: `feature/aws-localstack` - For hybrid development with LocalStack
  - Example: `feature/aws-cloud-deployment` - For AWS deployment configuration

- **fix/LT-XXX-descriptive-name**: For bug fixes
  - Created from: `develop` (or `production` for hotfixes)
  - Merged to: `develop` (and `production` for hotfixes)
  - Example: `fix/LT-67-login-form-validation`

- **refactor/LT-XXX-descriptive-name**: For code refactoring without changing functionality
  - Created from: `develop`
  - Merged to: `develop`
  - Example: `refactor/LT-89-optimize-auth-service`

- **docs/LT-XXX-descriptive-name**: For documentation changes
  - Created from: `develop`
  - Merged to: `develop`
  - Example: `docs/LT-12-update-installation-guide`

- **test/LT-XXX-descriptive-name**: For adding or modifying tests
  - Created from: `develop`
  - Merged to: `develop`
  - Example: `test/LT-34-add-payment-service-tests`

For a visual representation of our branching strategy, see [Branching Strategy Diagram](docs/workflows/branching-strategy.md).

#### Branch Naming Guidelines
1. Always use the appropriate prefix based on the type of change
2. Include the ticket/issue number when applicable (e.g., LT-123)
3. Use kebab-case (hyphen-separated words) for readability
4. Keep descriptions concise but descriptive

### CI/CD Pipeline

Our CI/CD pipeline automates the process of building, testing, and deploying the application:

1. Code is committed to feature branches
2. Pull requests are created to merge changes into the `develop` branch
3. Automated tests are run on all pull requests
4. Code is reviewed by team members
5. Approved changes are merged into the `develop` branch
6. Changes in the `develop` branch are deployed to the staging environment
7. Changes in the `production` branch are deployed to the production environment

For more details, see [CI/CD Pipeline Documentation](docs/workflows/cicd-pipeline.md).

### Contributing

Contributions are welcome! Please follow these guidelines:

1.  Ensure you're on the latest `develop` branch:
    ```bash
    git checkout develop
    git pull origin develop
    ```

2.  Create a new branch from `develop` following the branch naming guidelines:
    ```bash
    # For a new feature with ticket LT-123
    git checkout -b feature/LT-123-descriptive-feature-name

    # For a bug fix with ticket LT-456
    git checkout -b fix/LT-456-descriptive-bug-fix

    # For code refactoring
    git checkout -b refactor/LT-789-component-to-refactor
    ```

3.  Make your changes and ensure code quality:
    ```bash
    npm run lint
    ```

4.  Run tests to ensure your changes don't break existing functionality:
    ```bash
    npm test
    ```

5.  Commit your changes with descriptive messages following conventional commits:
    ```bash
    git commit -m "feat: add new feature"
    # or
    git commit -m "fix: resolve issue with login form"
    ```

6.  Push your branch to the repository:
    ```bash
    git push origin feature/LT-123-descriptive-feature-name
    ```

7.  Create a Pull Request against the `develop` branch using the appropriate PR template:
    - For features: Add `?template=feature.md` to the PR URL
    - For bug fixes: Add `?template=bugfix.md` to the PR URL
    - For documentation: Add `?template=documentation.md` to the PR URL

8.  Ensure your PR passes all automated tests and CI checks.

9.  Request a code review from at least one team member.

10. Address any feedback from reviewers.

11. Once approved, your changes will be merged into the `develop` branch and deployed to the staging environment.

12. For production releases, a PR will be created from `develop` to `production` after thorough testing in the staging environment.

## Deployment

Our deployment process is automated through our CI/CD pipeline. However, you can also build and deploy manually if needed.

### Environments

We have three deployment environments:

1. **Development**: Local development environment using LocalStack for AWS service emulation
2. **Staging**: AWS environment for testing with real AWS services but test data
3. **Production**: AWS environment for production with real AWS services and production data

### Automated Deployment

Our CI/CD pipeline automatically deploys:
- To the staging environment when changes are merged to the `develop` branch
- To the production environment when changes are merged to the `production` branch (after approval)

### Building for Production

To build the application for production manually:

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Manual Deployment Options

1. **AWS Amplify** (Recommended)
   - Connect your GitHub repository to AWS Amplify
   - Configure build settings to use `npm run build`
   - Set up environment variables in the Amplify console
   - Configure branch-specific settings:
     - `develop` branch deploys to staging environment
     - `production` branch deploys to production environment

2. **Netlify/Vercel**
   - Connect your GitHub repository
   - Configure build command: `npm run build`
   - Set output directory: `dist`
   - Configure environment variables
   - Set up branch-specific deployment settings

3. **Manual Deployment**
   - Build the application: `npm run build`
   - Deploy the contents of the `dist` directory to your web server

### Rollback Procedure

If a deployment fails or causes issues in production:

1. Identify the issue
2. Trigger a rollback to the previous stable version
3. Create a fix branch from `develop` to address the issue
4. Follow the normal deployment process to deploy the fix

For more details, see the [CI/CD Pipeline Documentation](docs/workflows/cicd-pipeline.md).

## Internationalization

The application supports multiple languages through a custom translation system:

- Translation strings are defined in `src/translations/index.js`
- The `LanguageContext` in `src/contexts/LanguageContext.js` provides language switching functionality
- Currently supported languages: English (default), with plans to add more

## Troubleshooting

### Common Issues

1. **Node.js Version Compatibility**
   - Ensure you're using Node.js version 18.x or higher
   - If you have multiple Node.js versions, use nvm to switch: `nvm use 18`

2. **Dependency Issues**
   - If you encounter dependency conflicts, try:
     ```bash
     rm -rf node_modules
     npm cache clean --force
     npm install
     ```

3. **Environment Variables**
   - Make sure your `.env.local` file contains all required variables
   - Remember that environment variables must be prefixed with `VITE_`
   - For authentication to work properly, ensure you have the correct Cognito Identity Pool ID configured

4. **Build Errors**
   - Check for ESLint errors: `npm run lint`
   - Ensure all imports are correct and files exist

## Resources and References

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Material UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)

---

This README is a living document. If you find any information that is missing or incorrect, please update it to help future developers.
