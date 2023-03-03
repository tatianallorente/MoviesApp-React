import PropTypes from "prop-types";

import { Box } from '@mui/material';

import { URL_REQUIRED_PARAMS } from "../../helpers/constants";
import TopMovies from "../TopMovies";


export const Recommendations = ({ idMovie }) => {

	const urlRecommendations = `https://api.themoviedb.org/3/movie/${idMovie}/recommendations${URL_REQUIRED_PARAMS}`;


	return (
    <Box
      mt={3}
      mb={3}
      sx={{
        'h3': {
          border: 'none',
          paddingLeft: 0,
          fontSize: theme => theme.typography.h6.fontSize
        }
      }}
    >
      <TopMovies topUrl={urlRecommendations} topTitle="Recomendaciones"/>
    </Box>
	)
}

Recommendations.propTypes = {
	idMovie: PropTypes.string.isRequired,
}
