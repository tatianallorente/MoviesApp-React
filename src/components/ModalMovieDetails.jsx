import React from 'react';
import PropTypes from "prop-types";

import { useTheme } from '@mui/material/styles';
import { Backdrop, Box, CircularProgress, Dialog, DialogContent, IconButton, Typography, useMediaQuery, Zoom, Chip, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useFetch } from '../hooks';
import no_img from '../assets/img/no_img.png';
import { URL_IMG_BACKDROP, URL_IMG_POSTER, URL_REQUIRED_PARAMS } from '../helpers/constants';
import { convertMinsToTime, dateFormatted } from '../utils/utils';
import { TitleAndOverview, Genres, Ratings } from './movieDetails';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});


const ModalMovieDetails = ({ idMovie, handleClose, open }) => {

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down(600)); //600px

	const urlDetails = `https://api.themoviedb.org/3/movie/${idMovie}${URL_REQUIRED_PARAMS}`;

  const { data:movieDetails, loading:loadingMovieDetails } = useFetch(urlDetails);
	const { title, original_title, original_language, backdrop_path, poster_path, genres,overview, tagline, vote_average, vote_count, release_date, runtime, imdb_id } = movieDetails || {};
	
	// Imágenes
	const background_url = `${URL_IMG_BACKDROP}${backdrop_path}`;
	const img_url = `${URL_IMG_POSTER}${poster_path}`;

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
						<Box display="flex">      
							{!matches &&
								<img src={poster_path ? img_url : no_img} alt={title} style={{maxWidth: '50%', objectFit: 'cover'}} />
							}
							<Box p={4} sx={{color: 'white'}} display="flex" justifyContent="space-between" flexDirection="column">
								<Box>
									<IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute', right: '5px', top: '5px'}}>
										<CloseIcon sx={{fontSize: 30, color: '#ffffff'}}/>
									</IconButton>
									<TitleAndOverview movieDetails={movieDetails} />
									{Object.keys(movieDetails)?.length > 0 &&
										<>
											<Box display="flex" justifyContent="space-evenly" alignItems="center" mt={2}>
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
											</Box>
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
								</Box>
								<Button variant="outlined" color="secondary" fullWidth size="small" sx={{mt: 2}}>
									Ver detalles
								</Button>
							</Box>
						</Box>
					</DialogContent>
				</Dialog>
			}

			<Backdrop open={loadingMovieDetails} sx={{zIndex: 100, backgroundColor: 'rgba(102, 102, 102, 0.7)'}}>
				<CircularProgress color="secondary" size={60} />
			</Backdrop>
		</div>
	)
}

ModalMovieDetails.propTypes = {
	idMovie: PropTypes.number.isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default ModalMovieDetails;
