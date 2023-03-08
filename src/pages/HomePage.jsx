import { useContext } from 'react';

import { Box, Container } from '@mui/material';

import { SearchFiltersContext } from '../context/SearchFiltersContext';
import Search from '../components/search/Search';
import MovieGrid from '../components/MovieGrid';
import TopMovies from '../components/TopMovies';
import { URL_DISCOVER_RATING, URL_TRENDING_MOVIES } from '../helpers/constants';


export const HomePage = () => {

  const { searchFilters } = useContext( SearchFiltersContext );


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

      <Container maxWidth="xl">
        {Object.keys(searchFilters).length > 0
          ? <MovieGrid />
          : <>
              <TopMovies
                topUrl={URL_TRENDING_MOVIES}
                topTitle="Tendencias esta semana"
              />

              <TopMovies
                topUrl={URL_DISCOVER_RATING}
                topTitle="Top mejor valoradas"
              />
            </>
        }
      </Container>
    </>
  )
}