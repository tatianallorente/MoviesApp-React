import { useParams } from 'react-router-dom';

import { Box, Container, Typography, Skeleton } from '@mui/material';

import { URL_IMG_POSTER_MEDIUM, URL_REQUIRED_PARAMS } from '../helpers/constants';
import { useFetch } from '../hooks';
import no_img from '../assets/img/no_img.png';
import { calculateAge, dateFormatted } from '../utils/utils';
import { KnownForScroller, CreditList } from '../components/personDetails';
import { ErrorMessage } from '../components/ui';


export const PersonPage = () => {

	const { personID:personId } = useParams();

  const urlPerson = `https://api.themoviedb.org/3/person/${personId}${URL_REQUIRED_PARAMS}`;
  const urlMovies = `https://api.themoviedb.org/3/person/${personId}/movie_credits${URL_REQUIRED_PARAMS}`;

  const { data:person, loading:loadingPerson, error:errorPerson } = useFetch(urlPerson);
  const { data:movies={}, loading:loadingMovies, error:errorMovies } = useFetch(urlMovies);

  const { biography, birthday, name, place_of_birth, profile_path, deathday } = person || {};
  const { cast=[], crew=[] } = movies || {};

  const age = `(${calculateAge(birthday, deathday)} años)`;
  const birthdayFormatted = `${dateFormatted(birthday, 'long')} ${!deathday ? age : ''}`;


  return (
    <Container
      maxWidth="xl"
      sx={(theme) => ({
        //marginTop: theme.spacing(6),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('xl')]: {
          padding: theme.spacing(4,8)
        }
      })}
    >
      {errorPerson === null
        ? <Box display="flex" alignItems="flex-start">
            <Box>
              {loadingPerson
                ? <Skeleton variant="rounded" width={300} height={450} animation="wave" sx={{marginBottom: 1}} />
                : <img src={profile_path ? `${URL_IMG_POSTER_MEDIUM}${profile_path}` : no_img} alt={name} style={{borderRadius: '6px', maxWidth: 300}} />
              }
              <Typography variant="h6" component="h6" color="primary" sx={{fontSize: '1rem'}}>
                {loadingPerson ? <Skeleton variant="text" width="70%" /> : 'Fecha de nacimiento:'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {loadingPerson ? <Skeleton variant="text" width="85%" /> : birthdayFormatted}
              </Typography>

              {deathday &&
                <>
                  <Typography variant="h6" component="h6" color="primary" sx={{fontSize: '1rem'}}>Fecha de defunción:</Typography>
                  <Typography variant="body1" component="p" gutterBottom>{dateFormatted(deathday, 'long')} {age}</Typography>
                </>
              }

              <Typography variant="h6" component="h6" color="primary" sx={{fontSize: '1rem'}}>
                {loadingPerson ? <Skeleton variant="text" width="70%" /> : 'Lugar de nacimiento:'}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {loadingPerson ? <Skeleton variant="text" width="85%" /> : place_of_birth}
              </Typography>
            </Box>

            <Box pl={4} sx={{ overflow: 'hidden'/* para scroller */, flexGrow: '1'}}>
              <Typography variant="h4" color="secondary" component="h2" gutterBottom>
                {loadingPerson ? <Skeleton variant="text" width="40%" /> : name}
              </Typography>
              {loadingPerson
                ? <Box mb={4}>
                  {[100, 90, 85, 99, 92, 75].map((percent, index) =>
                    <Skeleton variant="text" width={`${percent}%`} sx={index === 2 ? {marginBottom: 1} : {}} key={index} />
                  )}
                  </Box>
                : <Typography variant="body1" component="p" gutterBottom sx={{whiteSpace: 'break-spaces'}}>{biography}</Typography>
              }

              <KnownForScroller cast={cast} loading={loadingMovies} />
              <CreditList cast={cast} loading={loadingMovies} />
            </Box>
          </Box>
        : <ErrorMessage />
      }
    </Container>
  )
}