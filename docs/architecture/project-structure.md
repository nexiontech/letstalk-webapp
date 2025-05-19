# Project Structure

## Overview

The LetsTalk application follows a feature-based project structure that organizes code by functionality rather than by type. This approach makes it easier to locate and work with related files.

## Directory Structure

```
letstalk/
├── docs/                   # Documentation
├── public/                 # Public assets
├── src/                    # Source code
│   ├── assets/             # Static assets
│   ├── components/         # Reusable components
│   ├── config/             # Configuration files
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layouts
│   ├── pages/              # Page components
│   ├── services/           # API and service integrations
│   ├── store/              # Redux store
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── .env.example            # Example environment variables
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore file
├── index.html              # HTML entry point
├── jest.config.js          # Jest configuration
├── package.json            # NPM package configuration
├── README.md               # Project README
└── vite.config.js          # Vite configuration
```

## Key Directories and Files

### `/src/components`

Reusable UI components used throughout the application:

```
components/
├── Button/
│   ├── Button.jsx
│   ├── Button.css
│   └── index.js
├── Card/
│   ├── Card.jsx
│   ├── Card.css
│   └── index.js
├── Footer/
│   ├── Footer.jsx
│   ├── Footer.css
│   └── index.js
├── IdNumberInfo/
│   ├── IdNumberInfo.jsx
│   ├── IdNumberInfo.css
│   └── index.js
├── NavigationBar/
│   ├── NavigationBar.jsx
│   ├── NavigationBar.css
│   └── index.js
└── UserProfileForm/
    ├── UserProfileForm.jsx
    ├── UserProfileForm.css
    └── index.js
```

### `/src/pages`

Page components that represent different routes in the application:

```
pages/
├── AboutUsPage/
│   ├── AboutUsPage.jsx
│   ├── AboutUsPage.css
│   └── index.js
├── CommunityHub/
│   ├── CommunityHub.jsx
│   ├── CommunityHub.css
│   └── index.js
├── DashboardPage/
│   ├── DashboardPage.jsx
│   ├── DashboardPage.css
│   └── index.js
├── HomePage/
│   ├── HomePage.jsx
│   ├── HomePage.css
│   └── index.js
├── LoginPage/
│   ├── LoginPage.jsx
│   ├── LoginPage.css
│   └── index.js
├── RegisterPage/
│   ├── RegisterPage.jsx
│   ├── RegisterPage.css
│   └── index.js
├── ServiceIssuesPage/
│   ├── ServiceIssuesPage.jsx
│   ├── ServiceIssuesPage.css
│   └── index.js
└── UserProfilePage/
    ├── UserProfilePage.jsx
    ├── UserProfilePage.css
    └── index.js
```

### `/src/layouts`

Layout components that provide structure for pages:

```
layouts/
├── DashboardLayout/
│   ├── DashboardLayout.jsx
│   ├── DashboardLayout.css
│   └── index.js
└── PublicLayout/
    ├── PublicLayout.jsx
    ├── PublicLayout.css
    └── index.js
```

### `/src/contexts`

React contexts for state management:

```
contexts/
├── AuthContext.jsx
└── ThemeContext.jsx
```

### `/src/services`

Services for API calls and external integrations:

```
services/
├── amplifyAuthService.js
├── apiService.js
└── userProfileService.js
```

### `/src/utils`

Utility functions for common operations:

```
utils/
├── __tests__/
│   └── idNumberParser.test.js
├── authUtils.js
├── cognitoAuth.js
├── dateUtils.js
├── generateValidIdNumber.js
├── idNumberParser.js
├── jwtDecode.js
└── validationUtils.js
```

### `/src/store`

Redux store configuration and slices:

```
store/
├── slices/
│   ├── authSlice.js
│   ├── issuesSlice.js
│   └── userSlice.js
├── middleware.js
└── store.js
```

### `/src/config`

Configuration files:

```
config/
├── amplify.js
├── api.js
└── routes.js
```

## File Naming Conventions

The project follows these naming conventions:

- **Components**: PascalCase (e.g., `UserProfileForm.jsx`)
- **Utilities**: camelCase (e.g., `idNumberParser.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `AUTH_ACTIONS.js`)
- **CSS Files**: Same name as the component (e.g., `UserProfileForm.css`)
- **Test Files**: Same name as the file being tested with `.test.js` suffix (e.g., `idNumberParser.test.js`)

## Import Structure

Imports in files should follow this order:

1. React and React-related imports
2. Third-party library imports
3. Component imports
4. Context imports
5. Hook imports
6. Utility imports
7. Asset imports
8. Style imports

Example:

```jsx
// React and React-related imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Third-party library imports
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Component imports
import UserProfileForm from '../components/UserProfileForm';
import IdNumberInfo from '../components/IdNumberInfo';

// Context imports
import { useAuth } from '../contexts/AuthContext';

// Utility imports
import { parseIdNumber } from '../utils/idNumberParser';

// Style imports
import './UserProfilePage.css';
```

## Component Structure

Components should follow this structure:

1. Imports
2. Component definition
3. Hooks and state
4. Helper functions
5. Effect hooks
6. Render logic
7. Export

Example:

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState(initialState);
  const { user } = useAuth();
  
  // Helper functions
  const handleSomething = () => {
    // Implementation
  };
  
  // Effect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Render logic
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

## Best Practices

- **Keep files small**: Split large components into smaller ones
- **Use index.js for exports**: Use index.js files to simplify imports
- **Group related files**: Keep related files together in the same directory
- **Use relative imports**: Use relative paths for imports within the same feature
- **Document complex logic**: Add comments to explain complex logic
- **Follow consistent patterns**: Use the same patterns throughout the codebase
