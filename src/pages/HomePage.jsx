import { useContext } from 'react';

import { Box, Container } from '@mui/material';

import { SearchFiltersContext } from '../context/SearchFiltersContext';
import Search from '../components/search/Search';
import MovieGrid from '../components/MovieGrid';
import TopMovies from '../components/TopMovies';
import { URL_DISCOVER_MOVIES, URL_DISCOVER_RATING } from '../helpers/constants';


export const HomePage = () => {

  const { searchFilters } = useContext( SearchFiltersContext );

  // FIXME: Cambiar URLS TopMovies
  
  // TODO: urlTrending 
  // `https://api.themoviedb.org/3/trending/movie/week${URL_REQUIRED_PARAMS}`

  // TODO: Ahora en cines
  // https://api.themoviedb.org/3/movie/now_playing${URL_REQUIRED_PARAMS}&page=1

  // TODO: Get popular
  // https://api.themoviedb.org/3/movie/popular${URL_REQUIRED_PARAMS}&page=1

  // TODO: Get top rated
  // https://api.themoviedb.org/3/movie/top_rated${URL_REQUIRED_PARAMS}&page=1

  // TODO: Get upcoming
  // https://api.themoviedb.org/3/movie/upcoming${URL_REQUIRED_PARAMS}&page=1

  return (
    <>
      <Box
        mb={6}
        sx={{
          backgroundImage: `
            linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)),
            linear-gradient(120deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1))
          `,
          //border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '2px 0px 3px 2px rgb(0 0 0 / 10%)'
        }}
      >
        <Search />
      </Box>

      <Container
        maxWidth="xl"
        sx={(theme) => ({
          [theme.breakpoints.down('xl')]: {
            padding: theme => theme.spacing(0,8)
          }
        })}
      >
        {Object.keys(searchFilters).length > 0
          ? <MovieGrid />
          : <>
              <TopMovies
                topUrl={URL_DISCOVER_MOVIES}
                topTitle='Top más populares'
              />

              <TopMovies
                topUrl={URL_DISCOVER_RATING}
                topTitle='Top mejor valoradas'
              />
            </>
        }
      </Container>
    </>
  )
}