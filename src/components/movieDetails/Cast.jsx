import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Box, Container, Typography, Button, Skeleton } from '@mui/material';

import { useFetch } from "../../hooks";
import { URL_REQUIRED_PARAMS } from "../../helpers/constants";
import { ErrorMessage } from "../ui";


export const Cast = ({ idMovie }) => {

	const urlCast = `https://api.themoviedb.org/3/movie/${idMovie}/credits${URL_REQUIRED_PARAMS}`;
  const { data:castResults={}, loading:loadingCast, error:errorCast } = useFetch(urlCast);

  const [showAllActors, setShowAllActors] = useState(false);

  const { cast=[] } = castResults || {};

  const movieCast = cast?.length > 0 ? cast?.filter((result) =>  result.profile_path) : [];
  const renderCast = showAllActors ? movieCast : movieCast?.slice(0, 10);


  const styles = {
    castContainer: {
			padding: '0 !important', 
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
      gap: theme => theme.spacing(3),
			marginTop: theme => theme.spacing(2),
    },
    cast: {
			display: 'flex',
			flexDirection: 'column',
    },
  };


  const toggleActors = () => {
    setShowAllActors(!showAllActors);
  };


	return (
    <Box mt={3} mb={3} sx={{color: 'white'}}>
      <Typography variant="h6" component="h3" color="secondary">Reparto{showAllActors ? ` (${movieCast?.length})` : ':' }</Typography>
      <Container maxWidth="xl" sx={styles.castContainer}>
        {loadingCast &&
          [...Array(10).keys()].map((index) => 
            <Skeleton variant="rounded" height={200} animation="wave" key={index} />
          )
        }
        {!loadingCast && renderCast.map((cast) => 
          <Box key={cast.cast_id}>
            <Link to={`/person/${cast.id}`} style={{color: 'unset', textDecoration: 'none'}}>
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                alt={cast.name}
                sx={{
                  maxWidth: '100%',
                  transition: 'transform .2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Link>
            <Typography variant="body1" component="span" gutterBottom>
              {cast.character}
            </Typography>
            <Link to={`/person/${cast.id}`} style={{color: 'unset', textDecoration: 'none'}}>
              <Typography
                variant="body1"
                sx={{
                  color: 'grey',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {cast.name}	
              </Typography>
            </Link>
          </Box>
        )}
      </Container>

      <Container maxWidth="xl" sx={{marginTop: 3, padding: '0 !important'}}>
        {loadingCast
          ? <Skeleton variant="rounded" width="100%" height={30} animation="wave" />
          : movieCast?.length > 0 && errorCast === null
            ? <Button variant="outlined" color="secondary" fullWidth size="small" onClick={() => toggleActors()}>
                {showAllActors ? 'Ocultar' : 'Ver' } reparto completo
              </Button>
            : <ErrorMessage />
        }
      </Container>
    </Box>
	)
}

Cast.propTypes = {
  idMovie: PropTypes.string.isRequired,
}