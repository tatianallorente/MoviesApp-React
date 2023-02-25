import { Link } from 'react-router-dom';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import no_img from '../assets/img/no_img.png';
import { URL_IMG_POSTER } from '../helpers/constants';


const MovieGridItem = (movie) => {

	const {id, title, original_title, original_language, poster_path, vote_average} = movie;

	const movieTitle = original_language === 'es' ? original_title : title;
	const img_url = `${URL_IMG_POSTER}${poster_path}`;


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
					>
						<Link to={`/movie/${id}`} style={{color: 'unset', textDecoration: 'none', width: '100%'}}>
							Ver detalles
						</Link>
					</Button>
				</CardActions>
			</Card>
		</>
	)
}

export default MovieGridItem;