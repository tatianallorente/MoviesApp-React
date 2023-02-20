import PropTypes from "prop-types";

import { Box, Chip, Typography } from '@mui/material';


export const Genres = ({genres}) => {

  const styles = {
    movieGenres: {
			marginTop: '1rem',
			'& > ul': {
				display: 'flex', 
				flexWrap: 'wrap',
				listStyle: 'none', 
				padding: '0',
				'& > li': {
					paddingRight: '5px',
					paddingBottom: '5px'
				} 
			}
    }
  };

  // TODO: búsqueda por género haciendo click
	return (
    <Box sx={styles.movieGenres}>
      <Typography variant="h6" component="h3" color="secondary">Géneros:</Typography>
      <Box component="ul">
        {genres?.map((genre) => {
          return (
            <Box component="li" key={genre.id}>
              <Chip label={genre.name} sx={{color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.16)'}} />
            </Box>
          )
        })}
      </Box>
    </Box>
	)
}

Genres.propTypes = {
	genres: PropTypes.array.isRequired,
}
