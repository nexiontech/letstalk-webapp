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
    '0px 8px 16px rgba(0, 0, 0, 0.2)',
    '0px 10px 20px rgba(0, 0, 0, 0.25)',
    '0px 12px 24px rgba(0, 0, 0, 0.3)',
    '0px 14px 28px rgba(0, 0, 0, 0.35)',
    '0px 16px 32px rgba(0, 0, 0, 0.4)',
    '0px 18px 36px rgba(0, 0, 0, 0.45)',
    '0px 20px 40px rgba(0, 0, 0, 0.5)',
    '0px 22px 44px rgba(0, 0, 0, 0.55)',
    '0px 24px 48px rgba(0, 0, 0, 0.6)',
    '0px 26px 52px rgba(0, 0, 0, 0.65)',
    '0px 28px 56px rgba(0, 0, 0, 0.7)',
    '0px 30px 60px rgba(0, 0, 0, 0.75)',
    '0px 32px 64px rgba(0, 0, 0, 0.8)',
    '0px 34px 68px rgba(0, 0, 0, 0.85)',
    '0px 36px 72px rgba(0, 0, 0, 0.9)',
    '0px 38px 76px rgba(0, 0, 0, 0.95)',
    '0px 40px 80px rgba(0, 0, 0, 1)',
    '0px 42px 84px rgba(0, 0, 0, 1)',
    '0px 44px 88px rgba(0, 0, 0, 1)',
    '0px 46px 92px rgba(0, 0, 0, 1)',
    '0px 48px 96px rgba(0, 0, 0, 1)',
  ],
});

export default theme;
