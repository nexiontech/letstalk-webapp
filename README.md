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

*   User Authentication & Profile Management (via AWS Cognito)
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

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    *   Create a `.env.local` file in the project root (this file is gitignored).
    *   Add variables prefixed with `VITE_` as needed.
    *   Required environment variables:
        ```
        # API Configuration
        VITE_API_BASE_URL=http://localhost:3000/api

        # AWS Cognito Configuration (when implemented)
        VITE_COGNITO_REGION=us-east-1
        VITE_COGNITO_USER_POOL_ID=your-user-pool-id
        VITE_COGNITO_USER_POOL_WEB_CLIENT_ID=your-client-id

        # Feature Flags
        VITE_ENABLE_THUSONG_AI=false
        VITE_ENABLE_PAYMENTS=false
        ```
    *   Note: For development, you can use mock values or local endpoints.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    *   Navigate to `http://localhost:5173` (or the port specified in the terminal output) in your web browser.

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode with hot-reloading.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the code using ESLint to check for code quality and style issues.
*   `npm run preview`: Serves the production build locally to preview before deployment.

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

- **production**: Main production branch, contains stable code
- **develop**: Development branch for integrating features
- **feature/feature-name**: Feature branches for new development
- **fix/bug-name**: Bug fix branches

### Contributing

Contributions are welcome! Please follow these guidelines:

1.  Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/your-bug-fix
    ```

2.  Make your changes and ensure code quality:
    ```bash
    npm run lint
    ```

3.  Run tests to ensure your changes don't break existing functionality:
    ```bash
    npm test
    ```

4.  Commit your changes with descriptive messages following conventional commits:
    ```bash
    git commit -m "feat: add new feature"
    # or
    git commit -m "fix: resolve issue with login form"
    ```

5.  Push your branch to the repository:
    ```bash
    git push origin feature/your-feature-name
    ```

6.  Create a Pull Request against the `develop` branch.
7.  Ensure your PR passes any configured CI checks.
8.  Request a code review from a team member.

## Deployment

### Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Deployment Options

1. **AWS Amplify** (Recommended)
   - Connect your GitHub repository to AWS Amplify
   - Configure build settings to use `npm run build`
   - Set up environment variables in the Amplify console

2. **Netlify/Vercel**
   - Connect your GitHub repository
   - Configure build command: `npm run build`
   - Set output directory: `dist`
   - Configure environment variables

3. **Manual Deployment**
   - Build the application: `npm run build`
   - Deploy the contents of the `dist` directory to your web server

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
