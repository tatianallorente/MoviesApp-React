import PropTypes from "prop-types";

import { Box, CircularProgress, Typography } from '@mui/material';

import { useFetchRatings } from "../../hooks";


export const Ratings = ({imdb_id, vote_average, vote_count}) => {

	// Llamamos a nuestro custom hook useFetchRatings
	const { ratings, loadingRatings } = useFetchRatings(imdb_id);

  const styles = {
    ratings: {
			display:'flex',
			justifyContent: 'space-evenly',
			padding: 0,
			'& > li': {
				padding: '5px',
				margin: '5px',
				listStyle: 'none',
				textAlign: 'center'        
			}
    },
  };

  
	return (
    <>
      <Typography variant="h6" component="h3" color="secondary">Puntuación:</Typography>
      <Box component="ul" sx={styles.ratings}>
        <Box component="li"><strong>TMDB:</strong> {vote_average} de {vote_count} votos</Box>
        {loadingRatings && <CircularProgress /> }
        {!loadingRatings && ratings?.length > 0 &&
          ratings?.map((rating) => {
            return (
              <Box component="li" key={rating.Source}>
                <strong>{rating.Source}:</strong> {rating.Value}
              </Box>
            )
          })
        }
      </Box>
    </>
	)
}

Ratings.propTypes = {
  imdb_id: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  vote_count: PropTypes.number.isRequired,
}
