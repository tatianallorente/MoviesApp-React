import { useParams } from "react-router-dom";

import { Container, Box, Typography, Paper, Skeleton, useTheme } from '@mui/material';

import { useFetch } from '../hooks';
import no_img from '../assets/img/no_img.png';
import { URL_IMG_BACKDROP, URL_IMG_POSTER, URL_REQUIRED_PARAMS } from '../helpers/constants';
import { convertMinsToTime, dateFormatted } from '../utils/utils';
import { Cast, Genres, Ratings, TitleAndOverview, WatchProviders, Recommendations, TrailersAndMedia, Collection } from '../components/movieDetails';
import { ErrorMessage } from "../components/ui";


export const MovieDetailsPage = ( ) => {

  const theme = useTheme();

	const { movieID:idMovie } = useParams();

	const urlDetails = `https://api.themoviedb.org/3/movie/${idMovie}${URL_REQUIRED_PARAMS}`;
  const { data:movieDetails={}, loading:loadingMovieDetails, error: errorMovieDetails } = useFetch(urlDetails);

	const { title, backdrop_path, poster_path, genres, vote_average, vote_count, release_date, runtime, imdb_id, belongs_to_collection={} } = movieDetails || {};

	// Imágenes
	const background_url = `${URL_IMG_BACKDROP}${backdrop_path}`;
	const img_url = `${URL_IMG_POSTER}${poster_path}`;

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
			width: '500px',
			maxWidth: '40%',
			objectFit: 'cover',
			borderTopLeftRadius: '6px',
			borderBottomLeftRadius: '6px',
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		}
	};


	// TODO: Reviews
	// const url_reviews = `https://api.themoviedb.org/3/movie/${id}/reviews${URL_REQUIRED_PARAMS}`;


	return (
		<>
			<Paper sx={styles.paper}>
				<Container maxWidth="xl" sx={{padding: theme.spacing(6,3)}}>
					{loadingMovieDetails
						? <Skeleton variant="rounded" height={700} animation="wave" />
						:	Object.keys(movieDetails)?.length > 0 && errorMovieDetails === null
							? <Box display="flex" sx={{backgroundColor: 'rgba(0, 0, 0, .7)', borderRadius: '6px'}}>
									<Box component="img" src={poster_path ? img_url : no_img} alt={title} sx={styles.poster} />
									<Box sx={{padding: theme.spacing(4), color: 'white', width: '100%'}}>
										<TitleAndOverview movieDetails={movieDetails} />
										<Box display="flex" justifyContent="space-evenly" alignItems="center" mt={2}>
											<div>
												<Typography variant="h6" component="p" sx={{fontSize: '1rem'}}>Fecha de estreno:</Typography>
												<Typography variant="h6" component="h3" color="primary.light"> {dateFormatted(release_date)}</Typography>
											</div>
											{runtime > 0 &&
												<div>
													<Typography variant="h6" component="p" sx={{fontSize: '1rem'}}>Duración:</Typography>
													<Typography variant="h6" component="h3" color="primary.light"> {convertMinsToTime(runtime)}</Typography>
												</div>
											}
										</Box>
										{genres && genres?.length > 0 &&
											<Genres genres={genres} />
										}
										<Ratings
											imdb_id={imdb_id}
											vote_average={vote_average}
											vote_count={vote_count}
										/>
										<WatchProviders idMovie={idMovie} />
									</Box>
								</Box>
							: <ErrorMessage />
					}
				</Container>
			</Paper>

			<Container maxWidth="xl">
				<Cast idMovie={idMovie} />
				<TrailersAndMedia idMovie={idMovie} />
				{belongs_to_collection && Object.keys(belongs_to_collection)?.length > 0 &&
					<Collection belongsToCollection={belongs_to_collection} />
				}
				<Recommendations idMovie={idMovie} />
			</Container>
		</>
	)
}
