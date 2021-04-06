import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { LinearProgress } from '@material-ui/core';

import PaginationUi from './ui/PaginationUi';
import MovieGridItem from './MovieGridItem';
import { getSearchResults } from './services/getSearchResults';


const useStyles = makeStyles((theme) => ({
    total: {
        textAlign: 'center',
        marginTop: '10px'
    }
  }));


const MovieGrid = ({busqueda}) => {

    const { title } = busqueda;

    // state de la app
    const [movies, setMovies] = useState({
        movies: [],
        loading: true
    });

    // Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(1);


    useEffect(() => {
        getSearchResults(busqueda, currentPage)
            .then(data => {
                const { results, total_pages, total_results } = data;

                setMovies({
                    movies: results,
                    loading: false
                });  
                
                // Guardar el total de paginas
                setTotalPages(total_pages);

                // Guardar el total de resultados
                setTotalResults(total_results);

                // TODO: hacer scroll al principio de la búsqueda al cambiar de página

            });

    }, [busqueda, currentPage]);

    // Paginacion
    const handlePagination = (e, value) => {
        setCurrentPage(value);
    };

    
    const classes = useStyles();


    return (
        <>

        { title && 
            <Typography variant="h4" color="textPrimary" component="h3">
                Resultados para:&nbsp;
                <Typography variant="h4" color="secondary" component="span">
                    {title}
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
                        {totalResults} películas encontradas
                    </Typography>
                </Container>

                <PaginationUi
                    totalPages={totalPages}
                    currentPage={currentPage}
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
                    totalPages={totalPages}
                    currentPage={currentPage}
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

