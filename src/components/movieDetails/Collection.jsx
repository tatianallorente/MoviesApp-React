import PropTypes from "prop-types";

import { Box, Button, Typography, Container } from '@mui/material';

import { URL_IMG_BACKDROP } from "../../helpers/constants";
import { useNavigate } from "react-router-dom";

export const Collection = ({ belongsToCollection }) => {

  const navigate = useNavigate();

  const { backdrop_path, id, name } = belongsToCollection || {};


	return (
    <Box mt={3} mb={3}>
      <Typography variant="h6" component="h3" color="secondary" gutterBottom>Ver colección</Typography>
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: `url(${backdrop_path ? `${URL_IMG_BACKDROP}${backdrop_path}` : ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, .1)',
          borderRadius: '6px',
          padding: '0 !important'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(63, 81, 181, .5)',
            borderRadius: '6px',
            backdropFilter: 'blur(3px)',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              backgroundImage: `url(${backdrop_path ? `${URL_IMG_BACKDROP}${backdrop_path}` : ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              padding: '0 !important',
              //borderRadius: '6px',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(63, 81, 181, .5)',
                width: '100%',
                height: '100%',
                padding: theme => theme.spacing(8,4),
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0, 0.5)',
                  borderRadius: '6px',
                  padding: 3,
                }}
              >
                <Typography variant="h5" component="h3" color="secondary" sx={{marginBottom: 2}}>{name}</Typography>
                <Button variant="contained" disableElevation onClick={() => navigate(`/collection/${id}`)}>Ver la colección</Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
	)
}

Collection.propTypes = {
	belongsToCollection: PropTypes.object.isRequired,
}
