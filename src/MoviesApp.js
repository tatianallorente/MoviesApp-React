import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
// Es como normalize.css para resetear los estilos por defecto del navegador
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { amber, indigo } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

import Search from './components/Search';
import MovieGrid from './components/MovieGrid';
import Menu from './components/ui/Menu';
import { TopMovies } from './components/ui/TopMovies';
import { API_KEY } from './helpers/constants';
import './styles.css';


function MoviesApp() {

	const [filters, setFilters] = useState({});

	const existingPreference = localStorage.getItem("moviesThemeMode"); 
	const initialState = existingPreference === 'light' ? 'light' : 'dark';
	const [darkState, setDarkState] = useState(initialState);  

	const palletType = darkState === "dark" ? "dark" : "light";
	const mainPrimaryColor = indigo[500]; //cyan[900]
	const mainSecondaryColor = darkState ? amber[400] : amber[500];
	const textSecondaryColor = darkState ? indigo[300] : indigo[800];

	const darkTheme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {
				main: mainPrimaryColor
			},
			secondary: {
				main: mainSecondaryColor
			},
			text: {
				secondary: textSecondaryColor
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
			h6: {
				fontFamily: 'Merienda, sans-serif'
			},
		},
	});


	const useStyles = makeStyles((theme) => ({
		search: {
		backgroundImage: 'linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)), linear-gradient(120deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1))',
		//border: '1px solid rgba(0, 0, 0, 0.1)',
		boxShadow: '2px 0px 3px 2px rgb(0 0 0 / 10%)'
		},
		footer: {
		  color: '#aaa',
		  margin: '2rem auto',
		  textAlign: 'center',
		  width: '70%',
		  '& a': {
			  color: textSecondaryColor
		  }
		}
	}));


  	const classes = useStyles();


    const urlNew = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

	const urlRating = `https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&vote_count.gte=18000&api_key=${API_KEY}`;

	// TODO: top upcoming

    return (
    
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <Menu
              theme={darkState}
              setTheme={setDarkState}
              existingPreference={existingPreference}
            />

            <Container maxWidth="xl">
				<TopMovies
				topUrl={urlNew}
				topTitle='Top más populares'
				/>

				<TopMovies
				topUrl={urlRating}
				topTitle='Top mejor valoradas'
				/>
          	</Container>

          	<Box margin={'50px auto'} className={classes.search}>
              	<Search
                    setFilters={setFilters}
                />
            </Box>

            { Object.keys(filters).length > 0 ?
                <Container maxWidth="xl">
                    <MovieGrid
                        busqueda={filters}
                    />
                </Container>
                : null
            }  

			<footer className={classes.footer}>&copy; Designed and developed by&nbsp;
            	<a href="https://github.com/tatianallorente/MoviesApp-React" target="_blank" rel="noreferrer" >Tatiana Llorente</a>
            </footer>

        </ThemeProvider>
    );
}

export default MoviesApp;
