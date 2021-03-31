import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
/*

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
*/

import no_img from '../../img/no_img.png';
import { useFetchRatings } from '../../hooks/useFetchRatings';
/*
import { getRatingsImdb } from '../../helpers/getRatingsImdb';
import { API_KEY } from '../../helpers/constants';
import { useFetch } from '../../hooks/useFetch';
*/

const useStyles = makeStyles((theme) => ({
  root: {
      // maxWidth: 345,
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
      //maxWidth: '70%', // esto es para modal, no dialog
     // boxShadow: '3px 0px 10px #333', // ¿por que no se ve????!!!
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
      flexWrap: 'wrap',
      listStyle: 'none', 
      padding: '0',
      '& > li': {
          paddingRight: '5px',
          paddingBottom: '5px'
      } 
  },
  castContainer: {
      padding: '0', 
      display: 'flex'
  },
  cast: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: .1,
      flexBasis: 0, 
      marginRight: theme.spacing(3),
      '&:last-child': {
          marginRight: 0
      }
  }
}));


export const MovieModal = ({movieDetails, movieCast, handleClose, open}) => {
    
    console.log('movieDetails')
    console.log(movieDetails)

    const {id, title, original_title, original_language, backdrop_path, poster_path, genres,overview, tagline, vote_average, vote_count, release_date, runtime, imdb_id} = movieDetails;


    // imagenes
    const background_url = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const img_url = `https://image.tmdb.org/t/p/w500${poster_path}`;


    // Llamamos a nuestro custom hook useFetchRatings
    const { ratings } = useFetchRatings(imdb_id);


    const convertMinsToTime = (mins) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}h ${minutes}mins`;
    }


    const classes = useStyles();

    return (
        <div>
        {/* !movies.loading && 
                <div className={classes.cargando}>
                    <CircularProgress color="secondary" />
                </div>
        */}

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
            className={classes.modal} 
            style={{backgroundImage: `url(${background_url})`}}
            maxWidth='lg' 
            PaperProps={{
                style: {
                backgroundColor: 'rgba(0, 0, 0, .5)', // transparent
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
            <DialogContent  className={classes.paper}>
                <div style={{display:'flex'}}>
                    <img src={poster_path ? img_url : no_img} alt={title} style={{maxWidth:'50%'}}/>
                    <div className={classes.contenido}>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon className={classes.title} style={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                        <h2 id="transition-modal-title">{title}</h2>
                        {
                            tagline
                            ? <h3 style={{color: 'greenyellow'}}>{tagline}</h3>
                            : null
                        }
                        <p id="transition-modal-description">{overview}</p>
                        
                        
                        { Object.keys(movieDetails).length > 0 ?
                            <>
                            <p>Fecha de estreno: {release_date}</p>
                            <p>Duración: {convertMinsToTime(runtime)}</p>
                            {genres.length > 0 ?
                                <>
                                <p>Géneros:</p>
                                <ul className={classes.generos}>
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
                                </>
                                : null
                            }
                            <p>Puntuacion:</p>
                            {ratings.length > 0 ?
                                <>
                                <li>TMDB: {vote_average} de {vote_count} votos</li>
                                {ratings.map((r) => {
                                    return (
                                        <li key={r.Source}>
                                            {`${r.Source}: ${r.Value}`}
                                        </li>
                                    )
                                })}
                                </>
                            : <li>TMDB: {vote_average} de {vote_count} votos</li>
                            }
                            </>
                        : null
                        }
                        
                        <p>Reviews/criticas:</p>
                    </div>
                </div>          
            </DialogContent>
            
            { Object.keys(movieDetails).length > 0 && movieCast.length > 0 ?
                <div style={{color: 'white', padding: '24px'}}>
                    <h3>Reparto:</h3>
                    <Container maxWidth="xl" className={classes.castContainer}>
                            {movieCast.slice(0, 10).map((cast) => {
                                return (
                                    <div key={cast.id} className={classes.cast}>
                                        <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : no_img} alt={cast.character} style={{maxWidth:'100%'}}/>
                                        <div style={{padding: '10px 0'}}>
                                            <span style={{display: 'block'}}>{cast.character}</span>
                                            <span style={{color: 'grey'}}>{cast.name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                    </Container>
                </div>
            : null
            }
        </Dialog>
        </div>

    )


}





/*

        <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
            className={classes.modal} 
            style={{backgroundImage: `url(${background_url})`}} 
            maxWidth='xl' 
         //   PaperComponent='Modal'
            PaperProps={{
                style: {
                backgroundColor: 'rgba(0, 0, 0, .5)', // transparent
                boxShadow: 'none',
                },
            }}
            BackdropProps={{
                style: {
                    backgroundColor: 'transparent',
                },
              }}
        >
            <DialogContent  className={classes.paper}>
                <div style={{display:'flex'}}>
                    <img src={img_url} alt={title} style={{maxWidth:'50%'}}/>
                    <div className={classes.contenido}>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon className={classes.title} style={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                        <h2 id="transition-modal-title">{title}</h2>
                        <p id="transition-modal-description">{overview}</p>
                        
                        
                        { Object.keys(movieDetails).length > 0 ?
                            <>
                            <p>Fecha de estreno: {movieDetails.release_date}</p>
                            <p>Duración: {movieDetails.runtime}min</p>
                            <p>Géneros:</p>
                            <ul className={classes.generos}>
                                {movieDetails.genres.map((genre) => {
                                    return (
                                        <li key={genre.id}>
                                            <Chip
                                                label={genre.name}
                                                //className={classes.chip}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                            <p>Puntuacion:</p>
                            <p>Reviews/criticas:</p>
                            </>
                        : null
                        }
                    </div>
                </div>          
            </DialogContent>
            { Object.keys(movieDetails).length > 0 && movieCast.length > 0 ?
                <div style={{color: 'white', padding: '24px'}}>
                    <h3>Reparto:</h3>
                    <Container maxWidth="xl" className={classes.castContainer}>
                            {movieCast.slice(0, 10).map((cast) => {
                                return (
                                    <div key={cast.id} className={classes.cast}>
                                        <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : no_img} alt={cast.character} style={{maxWidth:'100%'}}/>
                                        <div style={{padding: '10px 0'}}>
                                            <span style={{display: 'block'}}>{cast.character}</span>
                                            <span style={{color: 'grey'}}>{cast.name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                    </Container>
                </div>
            : null
            }
        </Dialog>
        </div>
*/








/*

  
     <div>
     <Modal
       aria-labelledby="transition-modal-title"
       aria-describedby="transition-modal-description"
       className={classes.modal}
       open={open}
       onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{backgroundImage: `url(${background_url})`}}
      /*
      style={{backgroundImage: `linear-gradient(to right,white 0%,black 100%),url(${background_url})`,
      backgroundBlendMode: 'soft-light'}}
       */
/*    >
        <>
       <Typography variant="body2" component="span" style={{position: 'absolute', right: '15px',top: '15px'}}>
           <CloseIcon className={classes.title} style={{ fontSize: 70, color: '#fff' }}  onClick={handleClose} />
       </Typography>
      <Fade in={open}>

        <div className={classes.paper}>
           <img src={img_url} alt={title} style={{maxWidth:'50%'}}/>
           <div className={classes.contenido}>
               <h2 id="transition-modal-title">{title}</h2>
               <p id="transition-modal-description">{overview}</p>
               <p>Fecha de estreno: {movieDetails.release_date}</p>
               <p>Duración: {movieDetails.runtime}min</p>
               <p>Géneros:</p>
               
               { Object.keys(movieDetails).length > 0 ?
               <ul style={{display: 'flex', listStyle: 'none', padding: '0'}}>
                   {movieDetails.genres.map((genre) => {
                       return (
                           <li key={genre.id} style={{paddingRight: '5px'}}>
                               <Chip
                                   label={genre.name}
                                   //className={classes.chip}
                               />
                           </li>
                       )
                   })}
               </ul>
               : null
               }

           </div>
        </div>
      </Fade>
      </>
    </Modal>
  </div>



*/