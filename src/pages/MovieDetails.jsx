import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";

import { useTheme } from '@mui/material/styles';
import { Backdrop, Box, Chip, CircularProgress, Container, Dialog, DialogContent, IconButton, Typography, useMediaQuery, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { SearchFiltersContext } from '../context/SearchFiltersContext';
import no_img from '../assets/img/no_img.png';
import { URL_IMG_BACKDROP, URL_IMG_POSTER } from '../helpers/constants';
import { convertMinsToTime } from '../utils/utils';
import { useFetchRatings } from '../hooks';
import { getDetailedMovie } from '../services';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});


const MovieDetails = ({ idMovie, handleClose, open }) => {

	const styles = {
    dialog: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundSize: 'cover', 
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat'
    },
		dialogContent: {
			display: 'flex',
			color: '#fff',
			outline: 0,
			padding: '0px !important',
    },
    dialogFooter: {
			color: 'white',
			padding: '24px'
    },
    movieGenres: {
			marginTop: '1rem',
			'& > ul': {
				display: 'flex', 
				flexWrap: 'wrap',
				listStyle: 'none', 
				padding: '0',
				'& > li': {
					paddingRight: '5px',
					paddingBottom: '5px'
				} 
			}
    },
    ratings: {
			display:'flex',
			justifyContent: 'space-evenly',
			padding: 0,
			'& > li': {
				padding: '5px',
				margin: '5px',
				listStyle: 'none',
				textAlign: 'center'        
			}
    },
    castContainer: {
			padding: '0', 
			display: 'flex', 
			flexWrap: 'wrap',
			marginTop: '12px',
    },
    cast: {
			display: 'flex',
			flexDirection: 'column',
			flexGrow: .1,
			flexBasis: 0,
			'& div': {
				padding: '10px 0',
				wordBreak: 'break-word',
				'& span:first-of-type': {
					display: 'block'
				},
				'& span:last-child': {
					color: 'grey'
				},
			},
			'&:last-child': {
				marginRight: 0
			}
    },
    loading: {
			height: '100%',
			width: '100vw',    
			backgroundColor: 'rgba(0, 0, 0, .6)',
			position: 'fixed',
			left: 0,
			top: 0,
			zIndex: 9999
    }
	};


	const { setSearchFilters } = useContext( SearchFiltersContext );

	const [loading, setLoading] = useState(true);
	const [movieDetails, setDetailedMovie] = useState([]);
	const [movieCast, setCastMovie] = useState([]);

	// Llamamos a nuestro custom hook useFetchRatings
	const { ratings } = useFetchRatings(imdb_id); // TODO: añadir loading

	// TODO: Reviews
	// const url_reviews = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down(600)); //600px

	const {title, original_title, original_language, backdrop_path, poster_path, genres,overview, tagline, vote_average, vote_count, release_date, runtime, imdb_id} = movieDetails;

	// Imágenes
	const background_url = `${URL_IMG_BACKDROP}${backdrop_path}`;
	const img_url = `${URL_IMG_POSTER}${poster_path}`;


	useEffect(() => {
		getDetailedMovie(idMovie)
			.then(({movie, cast}) => {
				setDetailedMovie(movie);
				setCastMovie(cast); 
				setLoading(false);
			})
	}, [idMovie]);


	const searchActor = (castId) => {
		// TODO: hay que rellenar el autocompletado (filtros de la busqueda avanzada)
		handleClose();
		setSearchFilters({
			titleForm: '',
			genreForm: '',
			ratingForm: '',
			yearForm: '',
			withCastForm: castId,
			orderByForm: 'primary_release_date.desc'
		});
		//handleFiltersChange();
	}

	// TODO: trailers de las peliculas
  // https://api.themoviedb.org/3/movie/315162/videos?api_key=${API_KEY}&language=en-US

  // TODO: Peliculas similares a esta
  // https://api.themoviedb.org/3/movie/315162/similar?api_key=${API_KEY}&language=en-US&page=1

  //TODO: Mostrar donde ver pelicula en streaming
  // https://api.themoviedb.org/3/movie/315162/watch/providers?api_key=${API_KEY} (de los results mostrar: ES o selector de pais)
  // https://www.themoviedb.org/movie/550-fight-club/watch?locale=ES


	// TODO: componetizar cada parte del modal
	return (
		<div>
			{loading ? // FIXME: arreglar estilos del Backdrop
				<Backdrop open={loading}>
					<CircularProgress color="secondary" />
				</Backdrop>
			:
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
						{!matches &&
							<img src={poster_path ? img_url : no_img} alt={title} style={{maxWidth: '50%'}} />
						}
						<Box sx={{padding: theme => theme.spacing(2, 4)}}>
							<IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute', right: '5px', top: '5px'}}>
								<CloseIcon sx={{fontSize: 30, color: '#ffffff'}}/>
							</IconButton>
							<Typography variant="h3" color="secondary" component="h2" gutterBottom sx={{fontSize: matches ? '2rem' : '2.8rem'}}>
								{original_language === 'es' ? original_title : title}
							</Typography>
							{tagline &&
								<Typography variant="h5" component="h3" sx={{color: 'greenyellow', fontStyle: 'italic'}}>{tagline}</Typography>
							}
							<Typography variant="body1" component="p">{overview}</Typography>
							{Object.keys(movieDetails)?.length > 0 &&
								<>
									<div style={{display:'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1rem'}}>
										<div>
												<Typography variant="body1" component="p">Fecha de estreno:</Typography>
												<Typography variant="h6" component="h3" color="secondary"> {release_date}</Typography>
										</div>
										{runtime &&
											<div>
												<Typography variant="body1" component="p">Duración:</Typography>
												<Typography variant="h6" component="h3" color="secondary"> {convertMinsToTime(runtime)}</Typography>
											</div>
										}
									</div>
									{genres && genres?.length > 0 &&
										<Box sx={styles.movieGenres}>
											<Typography variant="h6" component="h3" color="secondary">Géneros:</Typography>
											<ul>
												{genres?.map((genre) => {
													return (
														<li key={genre.id}>
															<Chip label={genre.name} />
														</li>
													)
												})}
											</ul>
										</Box>
									}
									<Typography variant="h6" component="h3" color="secondary">Puntuación:</Typography>
									<Box component="ul" sx={styles.ratings}>
										{ratings?.length > 0
											?	<>
													<li><strong>TMDB:</strong> {vote_average} de {vote_count} votos</li>
													{ratings?.map((r) => {
														return (
															<li key={r.Source}>
																<strong>{r.Source}:</strong> {r.Value}
															</li>
														)
													})}
												</>
											: <li><strong>TMDB:</strong> {vote_average} de {vote_count} votos</li>
										}
									</Box>
								</>
							}
							{/* 
							<Typography variant="h6" component="h3" color="secondary">Reviews/criticas:</Typography>
							*/}
						</Box>   
					</DialogContent>

					{(Object.keys(movieDetails).length > 0 && movieCast.length > 0 && !matches) &&
						<Box sx={styles.dialogFooter}>
							<Typography variant="h6" component="h3" color="secondary">Reparto:</Typography>
							<Container maxWidth="xl" sx={styles.castContainer}>
								{movieCast.slice(0, 10).map((cast) => {
									return (
										<Box key={cast.id} sx={styles.cast} mr={theme.spacing(3)}>
											<img 
												src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : no_img}
												alt={cast.character}
												onClick={() => searchActor(cast.id)}
												style={{cursor: 'pointer', maxWidth: '100%'}} 
											/>
											<Box>
												<Box component="span">{cast.character}</Box>
												<Box component="span" onClick={() => searchActor(cast.id)}
													sx={{
														cursor: 'pointer',
														'&:hover': {
															textDecoration: 'underline'
														}
												}}
												>
													{cast.name}
												</Box>
											</Box>
										</Box>
									)
								})}
							</Container>
						</Box>
					}
				</Dialog>
			}
		</div>
	)
}

MovieDetails.propTypes = {
	idMovie: PropTypes.number.isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default MovieDetails;
