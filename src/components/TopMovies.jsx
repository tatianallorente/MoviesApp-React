import { useState } from "react";

import { IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

import { useFetch, useModal } from "../hooks";
import MovieDetails from "../pages/MovieDetails";
import { URL_IMG_POSTER } from "../helpers/constants";


const TopMovies = ({topUrl, topTitle}) => {
  const { open, toggleModal } = useModal();

  const { data } = useFetch(topUrl);
  const topMovies = data ? data?.results?.filter((result) =>  result.backdrop_path) : [];

	const [currentMovie, setCurrentMovie] = useState('');


  // TODO: Mejorar scroll
  return (
    <Box mb={6} sx={{':is(:last-child)': {mb: 0}}}>
      <Typography variant="h4" color="secondary" component="h3" sx={{borderLeft: '5px solid', paddingLeft: theme => theme.spacing(1)}} gutterBottom>
        {topTitle}
      </Typography>

      {topMovies?.length > 0 && 
        <ImageList 
          cols={4}
          gap={0}
          sx={{
            gridAutoFlow: 'column',
            overflowX: 'scroll',
            gridTemplateColumns: 'calc(100% / 4.1) !important',
            gridAutoColumns: 'calc(100% / 4.1)',
          }}
        >
          {topMovies.slice(0, 10).map(movie => (
            <ImageListItem
              key={movie.id} 
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: .5
                }
              }}
              onClick={() => {
                toggleModal();
                setCurrentMovie(movie.id);
              }}
            >
              <img src={movie.backdrop_path ? `${URL_IMG_POSTER}${movie.backdrop_path}` : no_img} alt={movie.title} />
              <ImageListItemBar
                title={movie.title}
                sx={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                actionIcon={
                  <IconButton aria-label={`star ${movie.title}`} color="secondary">
                    <StarIcon color="secondary"/>
                    <Typography variant="h6" component="span">{movie.vote_average}</Typography>
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      }

      
      {open &&  
        <MovieDetails
          idMovie={currentMovie}
          handleClose={toggleModal}
          open={open}
        />
      }
    </Box>
  )
    

}

export default TopMovies;