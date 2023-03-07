import {  createTheme } from '@mui/material';
import { amber, indigo } from '@mui/material/colors';


export const customTheme = (themeMode) => {

  const mainPrimaryColor = indigo[500]; //cyan[900]
  const mainSecondaryColor = themeMode === "dark" ? amber[400] : amber[500];
  const textSecondaryColor = themeMode === "dark" ? indigo[300] : indigo[800];
  const backgroundColor = themeMode === "dark" ? '#303030' : '#fbfbfb';
  const alertInfoBackgroundColor = themeMode === "dark" ? '#3e3e3e' : '#e1e1e1';
  const alertInfoIconColor = themeMode === "dark" ? '#e1e1e1' : '#585858';


  const customTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
      info: {
        main: '#585858',
      },
      text: {
        secondary: textSecondaryColor
      },
      background: {
        default: backgroundColor,
        paper: backgroundColor
      }
    },
    typography: {
      h2: {
        fontFamily: 'Merienda, sans-serif'
      },
      h3: {
        fontFamily: 'Merienda, sans-serif'
      },
      h4: {
        fontFamily: 'Merienda, sans-serif'
      },
      h5: {
        fontFamily: 'Merienda, sans-serif'
      },
      h6: {
        fontFamily: 'Merienda, sans-serif'
      },
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          standardInfo: {
            backgroundColor: alertInfoBackgroundColor,
            '& .MuiAlert-icon': {
              color: alertInfoIconColor,
            }
          },
        },
      },
    }
  });

  return customTheme;
}