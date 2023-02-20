import {  createTheme } from '@mui/material';
import { amber, indigo } from '@mui/material/colors';


export const customTheme = (themeMode) => {

  const mainPrimaryColor = indigo[500]; //cyan[900]
  const mainSecondaryColor = themeMode === "dark" ? amber[400] : amber[500];
  const textSecondaryColor = themeMode === "dark" ? indigo[300] : indigo[800];  
  const backgroundColor = themeMode === "dark" ? '#303030' : '#ffffff';


  const customTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
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
  });

  return customTheme;
}