import PropTypes from "prop-types";

import { Box, Chip, Typography } from '@mui/material';


export const TitleAndOverview = ({ movieDetails }) => {
  const { title, original_title, original_language, tagline, overview, name } = movieDetails;

	return (
    <Box>
      <Typography variant="h4" color="secondary" component="h2" gutterBottom>
        {title || name}
      </Typography>
      {original_title &&
        <Box>
          <Typography variant="body1" component="span" sx={{fontFamily: 'Merienda'}} gutterBottom>Título original:</Typography>
          <Chip label={original_language} variant="outlined" color="secondary" size="small"
            sx={{
              textTransform: 'uppercase',
              borderRadius: '4px',
              verticalAlign: 'text-bottom',
              margin: theme => theme.spacing(0,1),
              '.MuiChip-label': {
                paddingLeft: '4px',
                paddingRight: '4px'
              }
            }}
          />
          <Typography variant="body1" component="span" gutterBottom color="secondary.light">{original_title}</Typography>
        </Box>
      }

      {tagline &&
        <Typography variant="h6" component="h3" gutterBottom sx={{color: 'greenyellow', fontStyle: 'italic'}}>{tagline}</Typography>
      }
      <Typography variant="body1" component="p">{overview}</Typography>
    </Box>
	)
}

TitleAndOverview.propTypes = {
  movieDetails: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
      original_language: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  ])
}
