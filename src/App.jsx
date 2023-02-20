import { useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/material';

import { SearchFiltersProvider } from './context/SearchFiltersProvider';
import { customTheme } from './theme/customTheme';
import { HomePage } from './pages/HomePage';
import { Footer, Menu } from './components/ui';


function App() {

	const themeModeSelected = localStorage.getItem("moviesThemeMode") || 'dark';
	const [themeMode, setThemeMode] = useState(themeModeSelected);


  return (
    <ThemeProvider theme={ customTheme(themeMode) }>
      <CssBaseline />

      <SearchFiltersProvider>
        <Box sx={{flexGrow: 1}}>
          <Menu
            themeMode={themeMode}
            setTheme={setThemeMode}
          />
          <HomePage />
        </Box>
      </SearchFiltersProvider>

			<Footer />
    </ThemeProvider>
  )

}

export default App;