//import React, { useEffect, useState } from 'react';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
/*
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { findByLabelText } from '@testing-library/react';
import clsx from 'clsx';
*/

import no_img from '../img/no_img.png';
import { API_KEY } from '../helpers/constants';

import { MovieModal } from './ui/MovieModal';
import { useFetch } from '../hooks/useFetch';
//import { useFetchRatings } from '../hooks/useFetchRatings';




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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat'
    },
    paper: {
        //backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        //boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3), // multiplica por 8
        display: 'flex',
        color: '#fff',
        outline: 0,
        //backgroundColor: 'rgba(0, 0, 0, .5)', 
        padding: '0px !important',
    },
    contenido : {
        padding: theme.spacing(2, 4)
    },
    closeButton: {
        position: 'absolute', 
        right: '5px',
        top: '5px'
    },
    generos: {
        display: 'flex', 
        listStyle: 'none', 
        padding: '0',
        '& > li': {
            paddingRight: '5px'
        } 
    },
    castContainer: {
        
    },
    cast: {
        display: 'flex',
        flexDirection: 'column', 
        flexGrow: 1, 
        flexBasis: 0, 
        marginRight: theme.spacing(3),
        '&:last-child': {
            marginRight: 0
        }
    }
}));



const MovieGridItem = (movie) => {
    /*const [movieDetails, setDetailedMovie] = useState({
        movie: [],
        loading: true
    });*/

    //const [loading, setLoading] = useState([]); 
   // const [movieDetails, setDetailedMovie] = useState({});
   // const [movieCast, setCastMovie] = useState({});
    const [open, setOpen] = React.useState(false);

    const {id, title, original_title, original_language, poster_path, vote_average} = movie;

    // imagenes
    const img_url = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const classes = useStyles();


    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

/*
    const detalles = async (id) => {
        //console.log(id)

        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
        console.log({url});
      // la url final encodeURI(url)  

        const resp = await fetch(url);
        const data = await resp.json();
        console.log('detalles');
        console.log(data)
        setDetailedMovie(data);


        // ACTORES
        let url_actores = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
        console.log({url_actores});
        // la url final encodeURI(url)  

        const resp2 = await fetch(url_actores);
        const data2 = await resp2.json();
        //console.log(data2);
        //console.log(data2.cast)
        const resultado = data2.cast;
        // no mostrar los que no tengan foto
        const top = resultado.filter((result) => result.profile_path );
        setCastMovie(top);
    };
*/



    // OJO: estamos dentro de un bucle
    // Con el hook useFetch
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    const {data} = useFetch(url);
    const movieDetails = data ? data : [];

    let url_actores = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    const {data:data2} = useFetch(url_actores);
    const movieCast = data2 
                        ? data2.cast.filter((result) => result.profile_path ) 
                        : [];


                            
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


