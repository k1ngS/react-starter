import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // Azul do Tailwind (blue-500)
    },
    secondary: {
      main: '#10b981', // Verde do Tailwind (green-500)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
