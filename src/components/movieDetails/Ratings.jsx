import PropTypes from "prop-types";

import { Box, CircularProgress, Rating, Typography } from '@mui/material';

import { useFetchRatings } from "../../hooks";


const RatingCustom = ({name, value, titleSource, titleValue, ...props}) => {
  return (
    <>
      <span><strong>{titleSource}:</strong></span>
      <span>{titleValue}</span>
      <Rating
        {...props}
        name={name}
        value={value}
        precision={0.1}
        readOnly
        sx={{
          color: theme => theme.palette.secondary.main,
          '.MuiRating-iconEmpty':{
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }}
      />
    </>
  );
}

export const Ratings = ({imdb_id, vote_average, vote_count}) => {

	// Llamamos a nuestro custom hook useFetchRatings
	const { ratings, loadingRatings } = useFetchRatings(imdb_id);

  const styles = {
    ratings: {
			display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: theme => theme.spacing(1),
			padding: 0,
			'& > li': {
        display: 'flex',
        placeItems: 'center',
        flexDirection: 'column',
			}
    },
  };


	return (
    <>
      <Typography variant="h6" component="h3" color="secondary">Puntuación:</Typography>
      <Box component="ul" sx={styles.ratings}>
        <Box component="li">
          <RatingCustom
            name="TMDB"
            value={(parseFloat(vote_average)*5)/10}
            titleSource="TMDB"
            titleValue={vote_count ? `${parseFloat(vote_average).toFixed(2)} de ${vote_count} votos` : vote_average}
          />
        </Box>
        {loadingRatings && <Box component="li"><CircularProgress color="secondary" /></Box> }
        {!loadingRatings && ratings?.length > 0 &&
          ratings?.map((rating) => {
            return (
              <Box component="li" key={rating.Source}>
                <RatingCustom
                  name={rating.Source}
                  value={rating.ratingValue}
                  titleSource={rating.Source}
                  titleValue={rating.Value}
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
  imdb_id: PropTypes.string,
  vote_average: PropTypes.number.isRequired,
  vote_count: PropTypes.number,
}
