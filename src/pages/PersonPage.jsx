import { useParams } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

import { URL_REQUIRED_PARAMS } from '../helpers/constants';
import { useFetch } from '../hooks';
import no_img from '../assets/img/no_img.png';
import { calculateAge, dateFormatted } from '../utils/utils';


export const PersonPage = () => {

	const { personID:personId } = useParams();


  const urlPerson = `https://api.themoviedb.org/3/person/${personId}${URL_REQUIRED_PARAMS}`;
  const urlMovies = `https://api.themoviedb.org/3/person/${personId}/movie_credits${URL_REQUIRED_PARAMS}`;

  const { data:person, loading:loadingPerson, error:errorPerson } = useFetch(urlPerson);
  const { data:movies, loading:loadingMovies, error:errorMovies } = useFetch(urlMovies);

  const { biography, birthday, name, place_of_birth, profile_path, deathday } = person || {};
  const { cast=[], crew=[] } = movies || {};


  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        //marginTop: theme.spacing(6),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('xl')]: {
          padding: theme.spacing(0,8)
        }
      })}
    >
      <Box display="flex" alignItems="flex-start">
        <Box>
          <img src={profile_path ? `https://image.tmdb.org/t/p/w300${profile_path}` : no_img} alt={name} style={{borderRadius: '6px'}} />
          
          <Typography variant="h6" component="h6" color="primary" sx={{fontSize: '1rem'}}>Año de nacimiento:</Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {dateFormatted(birthday, 'long')} {!deathday ? `(${calculateAge(birthday)} años)` : `- ${dateFormatted(deathday)}`}
          </Typography>

          <Typography variant="h6" component="h6" color="primary" sx={{fontSize: '1rem'}}>Lugar de nacimiento:</Typography>
          <Typography variant="body1" component="p" gutterBottom>{place_of_birth}</Typography>
        </Box>
        <Box pl={4} sx={{ overflow: 'hidden'}}>
          <Typography variant="h4" color="secondary" component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom sx={{whiteSpace: 'break-spaces'}}>{biography}</Typography>
        </Box>
      </Box>
      
    </Container>
  )
}