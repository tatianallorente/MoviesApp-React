import PropTypes from "prop-types";

import { Box, CircularProgress, Rating, Typography } from '@mui/material';

import { useFetchRatings } from "../../hooks";


export const Ratings = ({imdb_id, vote_average, vote_count}) => {

	// Llamamos a nuestro custom hook useFetchRatings
	const { ratings, loadingRatings } = useFetchRatings(imdb_id);

  const styles = {
    ratings: {
			display:'flex',
			justifyContent: 'space-between',
      flexWrap: 'wrap',
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
        <Box component="li" display="flex" flexDirection="column">
          <strong>TMDB:</strong> {parseFloat(vote_average).toFixed(2)} de {vote_count} votos
          <Rating
            name="TMDB"
            value={(parseFloat(vote_average)*5)/10}
            precision={0.1}
            readOnly
            sx={{color: theme => theme.palette.secondary.main}}
          />
        </Box>
        {loadingRatings && <CircularProgress /> }
        {!loadingRatings && ratings?.length > 0 &&
          ratings?.map((rating) => {
            return (
              <Box component="li" display="flex" flexDirection="column" key={rating.Source}>
                <strong>{rating.Source}:</strong> {rating.Value}
                <Rating
                  name={rating.Source}
                  value={rating.ratingValue}
                  precision={0.1}
                  readOnly
                  sx={{color: theme => theme.palette.secondary.main}}
                />
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
