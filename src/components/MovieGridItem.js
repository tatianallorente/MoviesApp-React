import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';

import no_img from '../img/no_img.png';
import { MovieModal } from './ui/MovieModal';
import { getDetailedMovie } from './services/getDetailedMovie';
import { getCastMovie } from './services/getCastMovie';


const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        position: 'relative',
        borderRadius: '6px'
    },
    media: {
        //height: 0,
        //paddingTop: '56.25%', // 16:9
       // height: '420px'
       height:0,
       paddingTop: '145%'
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        //padding: theme.spacing(1)
    },
    cardTitle: {
        flexGrow: 1,
    },
    cardAverage: {
        display: 'flex',
        position: 'absolute',
        /*top: '6px',
        right: '12px',*/
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0, .4)',
        padding: '5px 5px 0 5px',
        borderBottomLeftRadius: '6px',
  
        '& > span:last-child': {
            alignSelf: 'center'
        }
    }
}));



const MovieGridItem = (movie) => {
    const [movieDetails, setDetailedMovie] = useState([]);
    const [movieCast, setCastMovie] = useState([]);

    const [open, setOpen] = useState(false);

    const {id, title, original_title, original_language, poster_path, vote_average} = movie;

    // imagenes
    const img_url = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const classes = useStyles();


    useEffect(() => {  
        getDetailedMovie(id)
            .then(movie => setDetailedMovie(movie))
    }, [id]);

    useEffect(() => {  
        getCastMovie(id)
            .then(cast => setCastMovie(cast))
    }, [id]);


    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <>
            <Card className={classes.root}>
                
                <CardMedia
                    className={classes.media}
                    image={poster_path ? img_url : no_img}
                    ///title={title}
                />
                  
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="textPrimary" component="span" className={classes.cardTitle}>
                        {original_language === 'es' ? original_title : title}
                    </Typography>

                    <Box className={classes.cardAverage}>
                        <Typography variant="body2" color="secondary" component="span" style={{lineHeight: 'initial'}}>
                            <StarBorderIcon className={classes.title} style={{ fontSize: '2rem' }}/>
                        </Typography>
                        <Typography variant="body2" color="secondary" component="span" style={{ fontSize: '1.4rem'}}>
                            {vote_average}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                    style={{width: '100%'}}
                        size="small" 
                        color="primary" 
                        //variant="outlined"
                        variant="contained"
                        onClick={() => {
                            //detalles(id);
                            handleOpen();
                        }}
                    >
                        Ver detalles
                    </Button>
                </CardActions>

            </Card>
        

            {/*
                // Abrir detalles de la pelicula en una ventana modal
            */}
            { open ?  
                <MovieModal
                    movieDetails={movieDetails}
                    movieCast={movieCast}
                    handleClose={handleClose}
                    open={open}
                   // ratings={ratings}
                />
            : null}
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


