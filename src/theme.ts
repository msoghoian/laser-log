import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'light'
    primary: {
      main: '#578B8B', // Customize to your brand color
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#FFDBBE',
    },
    background: {
      default: '#282828',
      paper: '#282828',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.4rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.active': {
            color: '#FF7070',
          },
        },
      },
    },
  },
});

export { theme };
