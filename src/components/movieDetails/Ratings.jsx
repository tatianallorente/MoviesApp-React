import PropTypes from "prop-types";

import { Box, Typography } from '@mui/material';


export const Ratings = ({ratings, vote_average, vote_count}) => {

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
        {ratings?.length > 0
          ?	<>
              <Box component="li"><strong>TMDB:</strong> {vote_average} de {vote_count} votos</Box>
              {ratings?.map((r) => {
                return (
                  <Box component="li" key={r.Source}>
                    <strong>{r.Source}:</strong> {r.Value}
                  </Box>
                )
              })}
            </>
          : <Box component="li"><strong>TMDB:</strong> {vote_average} de {vote_count} votos</Box>
        }
      </Box>
    </>
	)
}

Ratings.propTypes = {
	ratings: PropTypes.array.isRequired,
  vote_average: PropTypes.number.isRequired,
  vote_count: PropTypes.number.isRequired,
}
