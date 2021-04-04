import React, { useEffect, useState } from 'react';
import { API_KEY } from '../helpers/constants';
//import { useFetch } from '../hooks/useFetch';
import PaginationUi from './ui/PaginationUi';
import MovieGridItem from './MovieGridItem';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { LinearProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    cargando: {
        textAlign: 'center',
        border: '1px solid red'
    },
    total: {
        textAlign: 'center',
        marginTop: '10px'
    },      
        h3: {
          fontSize: '400px'
        }, 
    
  }));


const MovieGrid = ({busqueda}) => {

    const { titulo, genero, puntuacion, year, with_cast, orden } = busqueda;

    // state de la app
    const [movies, setMovies] = useState({
        movies: [],
        loading: true
    });

    // Paginacion
    const [paginaactual, guardarPaginaActual] = useState(1);
    const [totalpaginas, guardarTotalPaginas] = useState(1);
    const [totalresultados, guardarTotalResultados] = useState(1);


    useEffect(() => {
        const consultarApi = async () => {
           
            let url = '';
            if (titulo.trim() !== '') {
                url = `https://api.themoviedb.org/3/search/movie?query=${titulo}&api_key=${API_KEY}&page=${paginaactual}`;
            } else {
                const parameters = [
                    {paramName: 'with_genres', paramValue: genero},
                    {paramName: 'with_cast', paramValue: with_cast},
                    {paramName: 'vote_average.gte', paramValue: puntuacion},
                    {paramName: 'primary_release_year', paramValue: year},
                    {paramName: 'sort_by', paramValue: orden},
                ];        
                
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${paginaactual}`;
                
                // TODO: poner un minimo de vote_count para buscar por puntuacion

                const queryParams = parameters.filter( param => 
                    param.paramValue !== '' 
                ).map( param => 
                    param.paramName + '=' + param.paramValue
                ).join("&");
                // console.log({queryParams}); // son los que no estan vacios
            
                if ( queryParams !== '') {
                    url += `&${queryParams}`;                               
                }
    
                console.log({url});
                
            }
            

            // TODO: encodeURI(url)  
            const resp = await fetch(url);
            const data = await resp.json();
            //console.log({busqueda});
            //console.log({data});
     
            setMovies({
                movies: data.results,
                loading: false
            });  
             

            // Guardar el total de paginas
            guardarTotalPaginas(data.total_pages);

            // Guardar el total de resultados
            guardarTotalResultados(data.total_results);

            // TODO: hacer scroll al principio de la búsqueda al cambiar de página

        }
        consultarApi();
    }, [busqueda, paginaactual]);


    // Paginacion
    const handlePagination = (e, value) => {
        guardarPaginaActual(value);
    };

    

    const classes = useStyles();


    return (
        <>

        { titulo && 
            <Typography variant="h4" color="textPrimary" component="h3">
                Resultados para:&nbsp;
                <Typography variant="h4" color="secondary" component="span">
                    {titulo}
                </Typography>
            </Typography>
        }

        { movies.loading &&
            <LinearProgress color="secondary" />
        }

        { movies.movies.length > 0 ?
            <>
                <Container maxWidth="xl" className={classes.total}>
                    <Typography variant="h6" color="primary" component="h6">
                        {totalresultados} películas encontradas
                    </Typography>
                </Container>

                <PaginationUi
                    totalpaginas={totalpaginas}
                    paginaactual={paginaactual}
                    handlePagination={handlePagination}
                />

                <Grid container spacing={3}>
                    {
                        movies.movies.map( movie => (
                            <Grid item xs={4} sm={3} xl={2} key={movie.id}>
                            <MovieGridItem
                                key={movie.id}
                                {...movie}
                            />
                            </Grid>
                        ))
                    }
                </Grid>
                
                <PaginationUi
                    totalpaginas={totalpaginas}
                    paginaactual={paginaactual}
                    handlePagination={handlePagination}
                />
            </>
        :
            null
        }

        {!movies.loading && movies.movies.length < 1 &&
            <Container maxWidth="md" className={classes.total}>
                <Alert severity="warning">No se encontraron resultados</Alert>
            </Container>
        }
  
        </>
    )
}

export default MovieGrid;

