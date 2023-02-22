import PropTypes from "prop-types";

import { Box, Chip, Typography } from '@mui/material';


export const TitleAndOverview = ({ title, originalTitle, originalLanguage, tagline, overview }) => {


	return (
    <Box>
      <Typography variant="h4" color="secondary" component="h2" gutterBottom>
        {title}
      </Typography>
      <Box>
        <Typography variant="body1" component="span" sx={{fontFamily: 'Merienda'}} gutterBottom>Título original:</Typography>
        <Chip label={originalLanguage} variant="outlined" color="secondary" size="small"
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
        <Typography variant="body1" component="span" gutterBottom color="secondary.light">{originalTitle}</Typography>
      </Box>
      {tagline &&
        <Typography variant="h6" component="h3" gutterBottom sx={{color: 'greenyellow', fontStyle: 'italic'}}>{tagline}</Typography>
      }
      <Typography variant="body1" component="p">{overview}</Typography>
    </Box>
	)
}

TitleAndOverview.propTypes = {
	title: PropTypes.string.isRequired,
	originalTitle: PropTypes.string.isRequired,
	originalLanguage: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
}
