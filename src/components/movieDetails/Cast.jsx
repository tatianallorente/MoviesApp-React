import { useContext, useState } from "react";
import PropTypes from "prop-types";

import { Box, Container, Typography, Button } from '@mui/material';

import { SearchFiltersContext } from "../../context/SearchFiltersContext";


export const Cast = ({movieCast, handleClose}) => {

  const styles = {
    castContainer: {
			padding: '0', 
			display: 'flex', 
			flexWrap: 'wrap',
      gap: theme => theme.spacing(3),
			marginTop: '12px',
    },
    cast: {
			display: 'flex',
			flexDirection: 'column',
			flexGrow: .1,
			flexBasis: 0,
    },
  };

	const { setSearchFilters } = useContext( SearchFiltersContext );

  const [showAllActors, setShowAllActors] = useState(false);

  const renderCast = showAllActors ? movieCast : movieCast.slice(0, 10);

  
  const searchActor = (castId) => {
		// TODO: hay que rellenar el autocompletado (filtros de la busqueda avanzada) y mostrar ese tab
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

  const toggleActors = () => setShowAllActors(!showAllActors);


	return (
    <Box sx={{color: 'white', padding: '24px'}}>
      <Typography variant="h6" component="h3" color="secondary">Reparto:</Typography>
      <Container maxWidth="xl" sx={styles.castContainer}>
        {renderCast.map((cast) => {
          return (
            <Box key={cast.id} sx={styles.cast}>
              <Box component="img" 
                src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : no_img}
                alt={cast.character}
                onClick={() => searchActor(cast.id)}
                sx={{
                  cursor: 'pointer',
                  maxWidth: '100%',
                  minWidth: '80px',
                  transition: 'all .2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }} 
              />
              <Box sx={{padding: '10px 0', wordBreak: 'break-word'}}>
                <Box component="span" display="block">{cast.character}</Box>
                <Box component="span" onClick={() => searchActor(cast.id)}
                  sx={{
                    color: 'grey',
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
        
        <Button variant="outlined" color="secondary" fullWidth size="small" onClick={() => toggleActors()}>
          {showAllActors ? 'Ocultar' : 'Ver' } reparto completo
        </Button>
      </Container>
    </Box>
	)
}

Cast.propTypes = {
	movieCast: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
}
