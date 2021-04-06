import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';

import no_img from '../../img/no_img.png';
import { useFetchRatings } from '../../hooks/useFetchRatings';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    dialog: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    tagline: {
        color: 'greenyellow',
        fontStyle: 'italic'
    },
    paper: {
        display: 'flex',
        color: '#fff',
        outline: 0,
        padding: '0px !important',
        '& img': {
            maxWidth: '50%'
        },
        [theme.breakpoints.down(600)]: {
            '& img': {
                display: 'none'
            },
        },
    },
    dialogFooter: {
        color: 'white',
        padding: '24px'
    },
    dialogContent : {
        padding: theme.spacing(2, 4)
    },
    closeButton: {
        position: 'absolute', 
        right: '5px',
        top: '5px'
    },
    closeIcon: {
        fontSize: 30,
        color: '#fff'
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
        marginTop: '12px'
    },
    cast: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: .1,
        flexBasis: 0, 
        marginRight: theme.spacing(3),
        '& > img': {
            maxWidth:'100%'
        },
        '& div': {
            padding: '10px 0',
            wordBreak: 'break-word',
            '& span:first-child': {
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
}));


export const MovieModal = ({movieDetails, movieCast, handleClose, open}) => {

    const {id, title, original_title, original_language, backdrop_path, poster_path, genres,overview, tagline, vote_average, vote_count, release_date, runtime, imdb_id} = movieDetails;


    // imagenes
    const background_url = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const img_url = `https://image.tmdb.org/t/p/w500${poster_path}`;


    // Llamamos a nuestro custom hook useFetchRatings
    const { ratings } = useFetchRatings(imdb_id);

    /*
    let url_reviews = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;
    */

    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}h ${minutes}mins`;
    }


    const [ loading, setLoading] = useState(true);

    // Spinner
    setTimeout(() => {     
        // Elimina el spinner    
        setLoading(false);
    }, 1000);


    const matches = useMediaQuery(theme => theme.breakpoints.down(600)); //600px

    const classes = useStyles();

    return (
        <div>

        { loading ?
            <div className={`${classes.dialog} ${classes.loading}`}>
                <CircularProgress color="secondary" />
            </div>
        :
            <Dialog onClose={handleClose} aria-labelledby={title} open={open}
                className={classes.dialog}
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
                <DialogContent className={classes.paper}>        
                    <img src={poster_path ? img_url : no_img} alt={title}/>
                    <div className={classes.dialogContent}>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon className={classes.closeIcon}/>
                        </IconButton>
                        <Typography variant="h3" color="secondary" component="h2"
                            style={{
                                fontSize: matches ? '2rem' : '2.8rem'
                            }} 
                        >
                            {original_language === 'es' ? original_title : title}
                        </Typography>
                        {
                            tagline
                            ? <Typography variant="h5" component="h3" className={classes.tagline}>{tagline}</Typography>
                            : null
                        }
                        <Typography variant="body1" component="p">{overview}</Typography>
                        
                        { Object.keys(movieDetails).length > 0 ?
                            <>
                            <div style={{display:'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1rem'}}>
                            <div>
                                <Typography variant="body1" component="p">Fecha de estreno:</Typography>
                                <Typography variant="h6" component="h3" color="secondary"> {release_date}</Typography>
                            </div>
                            { runtime ? 
                                <div><Typography variant="body1" component="p">Duración:</Typography>
                                <Typography variant="h6" component="h3" color="secondary"> {convertMinsToTime(runtime)}</Typography></div>
                                : null
                            }
                            </div>
                            {genres && genres.length > 0 ?
                                <div className={classes.movieGenres}>
                                    <Typography variant="h6" component="h3" color="secondary">Géneros:</Typography>
                                    <ul>
                                        {genres.map((genre) => {
                                            return (
                                                <li key={genre.id}>
                                                    <Chip
                                                        label={genre.name}
                                                        //color="primary"
                                                        //className={classes.chip}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null
                            }
                            <Typography variant="h6" component="h3" color="secondary">Puntuación:</Typography>
                            <ul className={classes.ratings}>
                            {ratings.length > 0 ?
                                <>
                                <li><strong>TMDB:</strong> {vote_average} de {vote_count} votos</li>
                                {ratings.map((r) => {
                                    return (
                                        <li key={r.Source}>
                                            <strong>{r.Source}:</strong> {r.Value}
                                        </li>
                                    )
                                })}
                                </>
                            : <li><strong>TMDB:</strong> {vote_average} de {vote_count} votos</li>
                            }
                            </ul>
                            </>
                        : null
                        }
                        {/* 
                        <Typography variant="h6" component="h3" color="secondary">Reviews/criticas:</Typography>
                        */}
                    </div>   
                </DialogContent>
                { Object.keys(movieDetails).length > 0 && movieCast.length > 0 && !matches ?
                    <div className={classes.dialogFooter}>
                        <Typography variant="h6" component="h3" color="secondary">Reparto:</Typography>
                        <Container maxWidth="xl" className={classes.castContainer}>
                                {movieCast.slice(0, 10).map((cast) => {
                                    return (
                                        <div key={cast.id} className={classes.cast}>
                                            <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : no_img} alt={cast.character}/>
                                            <div>
                                                <span>{cast.character}</span>
                                                <span>{cast.name}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Container>
                    </div>
                : null
                }
            </Dialog>
        }
        </div>
    )
}
