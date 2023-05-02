import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Container, Box, Typography, Paper, Skeleton, useTheme, Card, CardContent, CardMedia, Button, CardActions, useMediaQuery } from '@mui/material';

import { useFetch } from '../hooks';
import no_img from '../assets/img/no_img.png';
import { URL_IMG_BACKDROP, URL_IMG_POSTER_SMALL, URL_IMG_POSTER_MEDIUM, URL_IMG_POSTER, URL_REQUIRED_PARAMS } from '../helpers/constants';
import { dateFormatted, getGenresByIds } from '../utils/utils';
import { Genres, Ratings, TitleAndOverview } from '../components/movieDetails';
import { ErrorMessage } from "../components/ui";


export const CollectionPage = () => {

  const theme = useTheme();
	const breakpointDownSm = useMediaQuery(theme.breakpoints.down('sm'));

	const { collectionID:collectionId } = useParams();

  const [collectionData, setCollectionData] = useState({
    genresCollection: [],
    voteAverageCollection: 0
  });

	const urlCollection = `https://api.themoviedb.org/3/collection/${collectionId}${URL_REQUIRED_PARAMS}`;
  const { data:collection={}, loading:loadingCollection, error: errorCollection } = useFetch(urlCollection);

  const { name, poster_path, backdrop_path, parts=[] } = collection || {};

  const { genresCollection, voteAverageCollection } = collectionData;

	// Imágenes
	const background_url = `${URL_IMG_BACKDROP}${backdrop_path}`;
	const img_url = `${URL_IMG_POSTER_MEDIUM}${poster_path}`;

	const styles = {
		paper: {
			backgroundImage: `url(${backdrop_path ? background_url : ''})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			boxShadow: 'none',
			borderRadius: 0,
			backgroundColor: 'rgba(0, 0, 0, .1)',
		},
		poster: {
			width: '300px',
			maxWidth: '40%',
			objectFit: 'cover',
			borderTopLeftRadius: '6px',
			borderBottomLeftRadius: '6px',
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		}
	};


  useEffect(() => {
    if (collection !== null) {
      let allGenres = [];
      let allVoteAverage = [];

      parts?.map(movie => {
        allVoteAverage.push(movie.vote_average);

        movie.genre_ids.map(genre =>
          allGenres.push(genre)
        )
      });

      // Genres
      const removeDuplicateGenres = [...new Set(allGenres)];
      const genresCollection = getGenresByIds(removeDuplicateGenres);

      // Votes average
      let sum = 0;
      allVoteAverage.map(voteAverage => sum += voteAverage);
      const voteAverageCollection = (sum / allVoteAverage.length).toFixed(1);

      setCollectionData({
        genresCollection,
        voteAverageCollection
      });
    }

  }, [collection]);


  return (
    <>
     	<Paper sx={styles.paper}>
				<Container maxWidth="xl" sx={{padding: theme.spacing(6,3)}}>
					{loadingCollection
						? <Skeleton variant="rounded" height={450} animation="wave" />
						:	Object.keys(collection)?.length > 0 && errorCollection === null
							? <Box display="flex" sx={{backgroundColor: 'rgba(0, 0, 0, .7)', borderRadius: '6px'}}>
									<Box component="img" src={poster_path ? img_url : no_img} alt={name} sx={styles.poster} />
									<Box sx={{padding: theme.spacing(4), color: 'white', width: '100%'}}>
                    <TitleAndOverview movieDetails={collection}/>
										<Genres genres={genresCollection} />
                    <Ratings vote_average={parseFloat(voteAverageCollection)} />

                    <Box mt={2} mb={2} display="flex" alignItems="baseline" gap={0.5}>
                      <Typography variant="body1" component="span" sx={{fontFamily: 'Merienda'}} gutterBottom>Número de películas: </Typography>
                      <Typography variant="body1" component="span" gutterBottom color="secondary.light">{parts?.length}</Typography>
                    </Box>
									</Box>
								</Box>
							: <ErrorMessage />
					}
				</Container>
			</Paper>

      <Container maxWidth="xl" sx={{marginTop: 4, marginBottom: 3}}>
        <Typography variant="h5" component="h3" color="secondary" sx={{marginBottom: 2}}>
          {loadingCollection ? <Skeleton variant="text" width="45%" /> : `Colección de ${parts?.length} películas:`}
        </Typography>

        {loadingCollection
          ? [...Array(2).keys()].map((index) =>
              <Skeleton variant="rounded" height={225} animation="wave" key={index} sx={{marginBottom: 3}} />
            )
          : parts?.map(movie => (
              <Card
                key={movie.id}
                sx={{
                  marginBottom: 3,
                  [theme.breakpoints.up('sm')]: {
                    display: 'flex',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    breakpointDownSm
                      ? `${URL_IMG_POSTER}${movie.backdrop_path}`
                      : `${URL_IMG_POSTER_SMALL}${movie.poster_path}`
                  }
                  alt={movie.title}
                  sx={{
                    [theme.breakpoints.up('sm')]: {
                      width: 'max-content',
                      display: 'flex',
                    },
                  }}
                />
                <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{width: '100%'}}>
                  <CardContent>
                    <Typography variant="h6" color="secondary" component="h4" gutterBottom>
                      {movie.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {dateFormatted(movie.release_date)}
                    </Typography>
                    <Typography variant="body1" component="p">{movie.overview}</Typography>
                  </CardContent>

                  <CardActions sx={{padding: 2}}>
                    <Button
                      fullWidth
                      size="small"
                      color="primary"
                      variant="contained"
                      disableElevation
                      component={Link}
                      to={`/movie/${movie.id}`}
                    >
                      Ver detalles
                    </Button>
                    </CardActions>
                  </Box>
              </Card>
            ))
        }
      </Container>
    </>
  )
}