/*src/theme.js*/
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E4649',
      light: '#1A5C60',
      dark: '#0A3437',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFB61D',
      light: '#FFC54A',
      dark: '#E6A00A',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      light: '#f8f8f8',
    },
    text: {
      primary: '#1F1F1F',
      secondary: '#666666',
    },
    success: {
      main: '#2E8B57',
    },
    warning: {
      main: '#FFA500',
    },
    error: {
      main: '#DC3545',
    },
    info: {
      main: '#0D6EFD',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '1.25rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0E4649',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          fontWeight: 600,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1A5C60',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#FFC54A',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 6px 12px rgba(0, 0, 0, 0.15)',
    // ... rest of the shadows
  ],
});

export default theme;
