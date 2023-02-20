import React, { useState } from 'react';
// Material-ui
import Container from '@material-ui/core/Container';
// Es como normalize.css para resetear los estilos por defecto del navegador
import CssBaseline from '@material-ui/core/CssBaseline';


import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


import Search from './components/Search';
import MovieGrid from './components/MovieGrid';
import Menu from './components/ui/Menu';
import { TopMovies } from './components/ui/TopMovies';
import { API_KEY } from './helpers/constants';

import './styles.css';
import { amber, indigo } from '@material-ui/core/colors';


function MoviesApp() {

	const [filtros, guardarFiltros] = useState({});

	//TODO: guardar en localstorage
	const [darkState, setDarkState] = useState(true);

	const palletType = darkState ? "dark" : "light";
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
		}
	});


	const useStyles = makeStyles((theme) => ({
		search: {
		backgroundImage: 'linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)), linear-gradient(120deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1))',
		//border: '1px solid rgba(0, 0, 0, 0.1)',
		boxShadow: '2px 0px 3px 2px rgb(0 0 0 / 10%)'
		}
	}));


  	const classes = useStyles();


    //TODO: Cambiar los parámetros de estas url
    const urlNew = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

    const urlRating = `https://api.themoviedb.org/3/discover/movie/?certification_country=US&sort_by=vote_average.desc&api_key=${API_KEY}`;

    return (
    
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <Menu
              theme={darkState}
              setTheme={setDarkState}
            />

            <Container maxWidth="xl">
				<TopMovies
				topUrl={urlNew}
				topTitle='Top 5 mas populares'
				/>

				<TopMovies
				topUrl={urlRating}
				topTitle='Top 5 mejor valoradas'
				/>
          	</Container>

          	<Box margin={'50px auto'} className={classes.search}>
              	<Search
                    guardarFiltros={guardarFiltros}
                />
            </Box>

            { Object.keys(filtros).length > 0 ?
                <Container maxWidth="xl">
                    <MovieGrid
                        busqueda={filtros}
                    />
                </Container>
                : null
            }  
        </ThemeProvider>
    );
}

export default MoviesApp;
