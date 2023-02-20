import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import MovieDetails from '../pages/MovieDetails';
import no_img from '../assets/img/no_img.png';
import { URL_IMG_POSTER } from '../helpers/constants';


const MovieGridItem = (movie) => {
	const [open, setOpen] = useState(false);
	const [currentMovie, setCurrentMovie] = useState('');

	const {id, title, original_title, original_language, poster_path, vote_average} = movie;

	const movieTitle = original_language === 'es' ? original_title : title;
	const img_url = `${URL_IMG_POSTER}${poster_path}`;


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	return (
		<>
			<Card sx={{position: 'relative', borderRadius: '6px'}} >
				<CardMedia
					image={poster_path ? img_url : no_img}
					//sx={{height: '350px'}}
					sx={{height: 0, paddingTop: '150%'}}
					//height="350"
					//component="img"
				/>
					
				<CardContent>
					<Tooltip title={movieTitle} placement="top">
						<Typography variant="body2" color="textPrimary" component="p"
							sx={{
								textOverflow: 'ellipsis',
								overflow: 'hidden',
								whiteSpace: 'nowrap'
							}}
						>
							{movieTitle}
						</Typography>
					</Tooltip>

					<Box 
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							backgroundColor: 'rgba(0,0,0, .5)',
							padding: '5px 5px 0 5px',
							borderBottomLeftRadius: '6px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Typography variant="body2" color="secondary" component="span" sx={{lineHeight: 'initial'}}>
							<StarBorderIcon fontSize="large" />
						</Typography>
						<Typography variant="h5" color="secondary" component="span">
							{vote_average}
						</Typography>
					</Box>
				</CardContent>
				<CardActions>

					<Button 
						fullWidth
						size="small" 
						color="primary" 
						variant="contained"
						disableElevation
						onClick={() => {
							handleOpen();
							setCurrentMovie(id);
						}}
					>
						Ver detalles
					</Button>
				</CardActions>
			</Card>

			{/* Abrir detalles de la pelicula en una ventana modal */}

			{open &&  
				<MovieDetails
					idMovie={currentMovie}
					handleClose={handleClose}
					open={open}
					// ratings={ratings}
				/>
			}
		</>
	)
}

export default MovieGridItem;



/*
               adult: false
               backdrop_path: "/srYya1ZlI97Au4jUYAktDe3avyA.jpg"
               belongs_to_collection: {id: 468552, name: "Wonder Woman Collection", poster_path: "/8AQRfTuTHeFTddZN4IUAqprN8Od.jpg", backdrop_path: "/n9KlvCOBFDmSyw3BgNrkUkxMFva.jpg"}
               budget: 200000000
               genres: (3) [{…}, {…}, {…}]
               homepage: "https://www.warnerbros.com/movies/wonder-woman-1984"
               id: 464052
               imdb_id: "tt7126948"
               original_language: "en"
               original_title: "Wonder Woman 1984"
               overview: "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah."
               popularity: 2089.125
               poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
               production_companies: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
               production_countries: [{…}]
               release_date: "2020-12-16"
               revenue: 159533000
               runtime: 152
               spoken_languages: [{…}]
               status: "Released"
               tagline: "A new era of wonder begins."
               title: "Wonder Woman 1984"
               video: false
               vote_average: 6.9
               vote_count: 3829
               
*/


