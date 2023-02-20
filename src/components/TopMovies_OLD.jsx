import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

import no_img from '../../img/no_img.png';
import { useFetch } from '../../hooks/useFetch';
import { MovieModal } from './MovieModal';
import { getDetailedMovie } from '../services/getDetailedMovie';
import { getCastMovie } from '../services/getCastMovie';

const useStyles = makeStyles((theme) => ({
    title: {
      //color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    rating: {
        //color: 'pink'
    },
    topSlider: {
        flexWrap:'nowrap',
        overflow:'hidden'
    },
    topTitle: {
        fontSize: '2rem',
        margin: '20px 0 10px 0',
        borderLeft: '5px solid',
        paddingLeft: '7px'
    },
    gridList: {
        cursor: 'pointer',
        '&:hover': {
            opacity: .5
        }
    }
}));


export const TopMovies = ({topUrl, topTitle}) => {

    // Con el hook useFetch
    const {data} = useFetch(topUrl);
    const topMovies = data 
                        ? data.results.filter((result) =>  result.backdrop_path ) 
                        : [];

    const [open, setOpen] = useState(false);

    const [activeMovie, setActiveMovie] = useState({});
    const [movieCast, setCastMovie] = useState([]);


    const handleOpen = (movie) => {
        getDetailedMovie(movie.id)
            .then(movie => setActiveMovie(movie));
        
        getCastMovie(movie.id)
            .then(cast => setCastMovie(cast));

        // getDetailedMovie y getCastMovie deberian estar dentro de un Promise.all()

        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const classes = useStyles();

    return (
        <>
            <Typography variant="h3" color="secondary" component="h3" className={classes.topTitle}>
                {topTitle}
            </Typography>
            <Grid container spacing={0} className={classes.topSlider}> 
                {(topMovies.length > 0) ?
                    topMovies.slice(0, 6).map(movie => (
                        <Grid item xs={3} xl={2} key={movie.id} >
                            <ImageList 
                                className={classes.gridList} 
                                cols={1}
                                onClick={() => {
                                    handleOpen(movie);
                                }}
                            >
                            <ImageListItem key={movie.id} >
                                <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : no_img} alt={movie.title} className=""/>
                                <ImageListItemBar
                                    title={movie.title}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton aria-label={`star ${movie.title}`} color="secondary">
                                            <StarIcon className={classes.title} color="secondary"/>
                                            <span className={classes.rating}>{movie.vote_average}</span>
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                            </ImageList>
                        </Grid>
                    ))
                : null}
            </Grid>

            { open ?  
                <MovieModal
                    movieDetails={activeMovie}
                    movieCast={movieCast}
                    handleClose={handleClose}
                    open={open}
                   // ratings={ratings}
                />
            : null}

        </>
    )
    

}

