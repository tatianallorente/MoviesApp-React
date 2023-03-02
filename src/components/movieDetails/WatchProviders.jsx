import PropTypes from "prop-types";

import { Box, Typography } from '@mui/material';
import { URL_REQUIRED_PARAMS } from "../../helpers/constants";
import { useFetch } from "../../hooks";


export const WatchProviders = ({ idMovie }) => {

	const urlStreaming = `https://api.themoviedb.org/3/movie/${idMovie}/watch/providers${URL_REQUIRED_PARAMS}`;
  
  const { data:streamingData={}, loading:loadingStreaming, error:errorStreaming } = useFetch(urlStreaming);

  const { results:streaming=[] } = streamingData || {};
  const { buy=[], flatrate=[], rent=[] } = streaming?.ES || {};


  if (flatrate?.length < 1) {
    return;
  }

	return (
    <Box>
      <Typography variant="h6" component="h3" color="secondary" gutterBottom>Ahora en streaming</Typography>
      <Box display="flex" gap={1}>
        {flatrate?.map(provider => 
          <img 
            key={provider.provider_id}
            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
            alt={provider.provider_name} title={provider.provider_name}
            width="36" height="36" style={{borderRadius: '4px'}}
          />
        )}
      </Box>
    </Box>
	)
}

WatchProviders.propTypes = {
	idMovie: PropTypes.string.isRequired,
}
