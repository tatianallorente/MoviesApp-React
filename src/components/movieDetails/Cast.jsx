import { useContext } from "react";
import PropTypes from "prop-types";

import { Box, Container, Typography } from '@mui/material';

import { SearchFiltersContext } from "../../context/SearchFiltersContext";


export const Cast = ({movieCast, handleClose}) => {

  const styles = {
    castContainer: {
			padding: '0', 
			display: 'flex', 
			flexWrap: 'wrap',
			marginTop: '12px',
    },
    cast: {
			display: 'flex',
			flexDirection: 'column',
			flexGrow: .1,
			flexBasis: 0,
			'& div': {
				padding: '10px 0',
				wordBreak: 'break-word',
				'& span:first-of-type': {
					display: 'block'
				},
				'& span:last-child': {
					color: 'grey'
				},
			},
			'&:last-child': {
				marginRight: 0
			}
    },
  };

	const { setSearchFilters } = useContext( SearchFiltersContext );


  const searchActor = (castId) => {
		// TODO: hay que rellenar el autocompletado (filtros de la busqueda avanzada)
		handleClose();
		setSearchFilters({
			titleForm: '',
			genreForm: '',
			ratingForm: '',
			yearForm: '',
			withCastForm: castId,
			orderByForm: 'primary_release_date.desc'
		});
		//handleFiltersChange();
	}


  // TODO: Mostrar más de 10 actores (quitar slice)
	return (
    <Box sx={{color: 'white', padding: '24px'}}>
      <Typography variant="h6" component="h3" color="secondary">Reparto:</Typography>
      <Container maxWidth="xl" sx={styles.castContainer}>
        {movieCast.slice(0, 10).map((cast) => {
          return (
            <Box key={cast.id} sx={styles.cast} mr={theme => theme.spacing(3)}>
              <img 
                src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : no_img}
                alt={cast.character}
                onClick={() => searchActor(cast.id)}
                style={{cursor: 'pointer', maxWidth: '100%'}} 
              />
              <Box>
                <Box component="span">{cast.character}</Box>
                <Box component="span" onClick={() => searchActor(cast.id)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {cast.name}
                </Box>
              </Box>
            </Box>
          )
        })}
      </Container>
    </Box>
	)
}

Cast.propTypes = {
	movieCast: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
}
