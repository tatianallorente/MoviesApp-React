import React from 'react';
import PropTypes from "prop-types";

import { useTheme } from '@mui/material/styles';
import { Backdrop, Box, CircularProgress, Dialog, DialogContent, IconButton, Typography, useMediaQuery, Zoom, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useFetch } from '../hooks';
import no_img from '../assets/img/no_img.png';
import { URL_IMG_BACKDROP, URL_IMG_POSTER, URL_REQUIRED_PARAMS } from '../helpers/constants';
import { convertMinsToTime, dateFormatted } from '../utils/utils';
import { Cast, Genres, Ratings } from '../components/movieDetails';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});


const MovieDetails = ({ idMovie, handleClose, open }) => {

	const urlDetails = `https://api.themoviedb.org/3/movie/${idMovie}${URL_REQUIRED_PARAMS}`;
	const urlCast = `https://api.themoviedb.org/3/movie/${idMovie}/credits${URL_REQUIRED_PARAMS}`;

  const { data:movieDetails, loading:loadingMovieDetails } = useFetch(urlDetails);
  const { data:castResults, loading:loadingCast } = useFetch(urlCast);

	const {title, original_title, original_language, backdrop_path, poster_path, genres,overview, tagline, vote_average, vote_count, release_date, runtime, imdb_id} = movieDetails || {};
  const movieCast = castResults ? castResults?.cast?.filter((result) =>  result.profile_path) : [];

	const styles = {
    dialog: {
			//display: 'flex',
			//alignItems: 'center',
			//justifyContent: 'center',
			backgroundSize: 'cover', 
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat'
    },
		dialogContent: {
			display: 'flex',
			flexDirection: 'column',
			color: '#fff',
			//outline: 0,
			padding: '0px !important',
    },
	};


	// TODO: Reviews
	// const url_reviews = `https://api.themoviedb.org/3/movie/${id}/reviews${URL_REQUIRED_PARAMS}`;

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down(600)); //600px

	// Imágenes
	const background_url = `${URL_IMG_BACKDROP}${backdrop_path}`;
	const img_url = `${URL_IMG_POSTER}${poster_path}`;


	// TODO: trailers de las peliculas
  // https://api.themoviedb.org/3/movie/315162/videos${URL_REQUIRED_PARAMS}

  // TODO: Peliculas similares a esta
  // https://api.themoviedb.org/3/movie/315162/similar${URL_REQUIRED_PARAMS}&page=1

  //TODO: Mostrar donde ver pelicula en streaming
  // https://api.themoviedb.org/3/movie/315162/watch/providers?api_key=${API_KEY} (de los results mostrar: ES o selector de pais)
  // https://www.themoviedb.org/movie/550-fight-club/watch?locale=ES


	return (
		<div>
			{!loadingMovieDetails &&
				<Dialog onClose={handleClose} aria-labelledby={title} open={open}
					sx={styles.dialog}
					style={{
						backgroundImage: matches ? `url(${img_url})` : `url(${background_url})`,backgroundColor: 'rgba(39, 77, 171, .3)'
					}}   
					maxWidth='lg' 
					TransitionComponent={Transition}
					PaperProps={{
						style: {
							backgroundColor: 'rgba(0, 0, 0, .7)',
							boxShadow: 'none',
							borderRadius: '6px'
						},
					}}
					BackdropProps={{
						style: {
							backgroundColor: 'transparent',
						},
					}}
				>
					<DialogContent sx={styles.dialogContent}>
						<Box sx={{display: 'flex'}}>      
							{!matches &&
								<img src={poster_path ? img_url : no_img} alt={title} style={{maxWidth: '50%', height: '100%'}} />
							}
							<Box sx={{padding: theme => theme.spacing(4, 2, 2, 4)}}>
								<IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute', right: '5px', top: '5px'}}>
									<CloseIcon sx={{fontSize: 30, color: '#ffffff'}}/>
								</IconButton>
								<Typography variant="h4" color="secondary" component="h2" gutterBottom>
									{title}
								</Typography>
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
								{tagline &&
									<Typography variant="h6" component="h3" gutterBottom sx={{color: 'greenyellow', fontStyle: 'italic'}}>{tagline}</Typography>
								}
								<Typography variant="body1" component="p">{overview}</Typography>
								{Object.keys(movieDetails)?.length > 0 &&
									<>
										<div style={{display:'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1rem'}}>
											<div>
												<Typography variant="h6" component="p" sx={{fontSize: '1rem'}}>Fecha de estreno:</Typography>
												<Typography variant="h6" component="h3" color="primary.light"> {dateFormatted(release_date)}</Typography>
											</div>
											{runtime &&
												<div>
													<Typography variant="h6" component="p" sx={{fontSize: '1rem'}}>Duración:</Typography>
													<Typography variant="h6" component="h3" color="primary.light"> {convertMinsToTime(runtime)}</Typography>
												</div>
											}
										</div>
										{genres && genres?.length > 0 &&
											<Genres genres={genres} />
										}
										<Ratings
											imdb_id={imdb_id}
											vote_average={vote_average}
											vote_count={vote_count}
										/>
									</>
								}
								{/* 
								<Typography variant="h6" component="h3" color="secondary">Reviews/criticas:</Typography>
								*/}
							</Box>  
						</Box> 
						{(Object.keys(movieDetails)?.length > 0 && movieCast?.length > 0 && !loadingCast && !matches) &&
							<Cast movieCast={movieCast} handleClose={handleClose} />
						} 
					</DialogContent>
				</Dialog>
			}

			<Backdrop open={loadingMovieDetails} sx={{zIndex: 100, backgroundColor: 'rgba(102, 102, 102, 0.7)'}}>
				<CircularProgress color="secondary" size={60} />
			</Backdrop>
		</div>
	)
}

MovieDetails.propTypes = {
	idMovie: PropTypes.number.isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default MovieDetails;
