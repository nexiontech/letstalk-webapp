# Let's Talk - Citizen WebApp

## Overview

This project is the citizen-facing Web Application for the "Let's Talk" platform. It provides a centralized interface for citizens to interact with government services, submit inquiries, receive updates, track service delivery, make payments, and communicate via a community hub.

This web application is built using ReactJS and Vite, connecting to a shared backend infrastructure powered by AWS services. It is part of a larger suite including mobile applications and a municipality portal.

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

*   **Framework:** ReactJS
*   **Build Tool:** Vite
*   **Routing:** React Router DOM (`react-router-dom`)
*   **Styling:** CSS Modules / Standard CSS (Potentially integrating a UI library like Material UI or Chakra UI later)
*   **State Management:** TBD (e.g., Zustand, Redux Toolkit)
*   **API Communication:** Fetch API / Axios, AWS SDK / AWS Amplify

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js:** Version 18.x or higher recommended. Download [Node.js](https://nodejs.org/)
*   **npm:** Comes bundled with Node.js.
*   **Git:** For cloning the repository. Download [Git](https://git-scm.com/)

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

3.  **Environment Variables (Setup Required Later):**
    *   This project will likely require environment variables for connecting to backend services (e.g., AWS Cognito User Pool ID, API Gateway URL).
    *   Create a `.env.local` file in the project root.
    *   Add variables prefixed with `VITE_` as needed (e.g., `VITE_API_BASE_URL=...`).
    *   *(Note: Specific variables TBD)*

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

Tests are configured to run in a jsdom environment, which simulates a browser-like environment. The testing setup includes:

* Jest as the test runner and assertion library
* React Testing Library for component testing
* jest-environment-jsdom for browser API simulation
* @testing-library/jest-dom for additional DOM matchers

## Project Structure
```
letstalk-webapp/
├── public/ # Static assets
├── src/ # Application source code
│ ├── assets/ # Component-specific assets (images, etc.)
│ ├── components/ # Reusable UI components (e.g., NavigationBar, Button)
│ ├── hooks/ # Custom React Hooks
│ ├── pages/ # Top-level page components (routed views)
│ ├── services/ # API interaction logic (e.g., authService, issueService)
│ ├── store/ # State management setup (if using Zustand/Redux)
│ ├── styles/ # Global styles, themes
│ ├── utils/ # Utility functions
│ ├── App.jsx # Root component, main layout, routing setup
│ ├── main.jsx # Application entry point
│ └── index.css # Global CSS resets/base styles
├── .env.local # Local environment variables (Gitignored)
├── .eslintrc.cjs # ESLint configuration
├── .gitignore # Git ignore rules
├── index.html # HTML template
├── package.json # Project dependencies and scripts
├── README.md # This file
└── vite.config.js # Vite configuration
```
## Contributing

Contributions are welcome! Please follow these general guidelines:

1.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `fix/your-bug-fix`.
2.  Make your changes and ensure code quality (`npm run lint`).
3.  Commit your changes with descriptive messages.
4.  Push your branch to the repository.
5.  Create a Pull Request against the `main` or `develop` branch (as per team convention).
6.  Ensure your PR passes any configured CI checks.

*(Please add more specific contribution guidelines as needed)*

---

Feel free to modify this template further with specific details about configuration, deployment, testing strategies, or contribution guidelines relevant to your team's workflow and agile approach
