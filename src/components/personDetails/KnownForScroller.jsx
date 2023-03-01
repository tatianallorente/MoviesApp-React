import PropTypes from "prop-types";

import { Box, Chip, Typography, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material';

import { URL_IMG_POSTER_SMALL } from "../../helpers/constants";
import no_img from '../../assets/img/no_img.png';
import { Link, Navigate, useNavigate } from "react-router-dom";

export const KnownForScroller = ({ movies }) => {

const navigate = useNavigate();
// console.log(movies)

  //const pez = (id) => navigate(`/movie/${id}`);

	return (
    <ImageList 
    cols={4}
    gap={16}
    sx={{
      //gridAutoFlow: 'column',
      overflowX: 'scroll',
      //gridTemplateColumns: 'calc(100% / 7.1) !important',
      //gridAutoColumns: 'calc(100% / 7.1)',
      marginTop: theme => theme.spacing(1),
      display: 'flex',
      flexWrap: 'nowrap'
    }}
  >
        {movies?.map(movie => {
          const {id, title, character, poster_path, popularity} = movie;//borrar popularity

          return (
            <ImageListItem
              key={id}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: .5
                },
                //width: '120px',
                //maxWidth: '140px'
              }}
              //onClick={() => pez(id)}
            >		
              <Link to={`/movie/${id}`}>
                <img src={`${URL_IMG_POSTER_SMALL}${poster_path}`} alt={title} title={title}
                style={{
                  borderTopLeftRadius: '6px', borderTopRightRadius: '6px',
                  width: '125px'
                }}
                />
                <ImageListItemBar
                  title={title}
                  subtitle={`${character} (${popularity})`}//borrar popularity
                />
              </Link>
            </ImageListItem>
          )
        })}
    </ImageList>
	)
}

KnownForScroller.propTypes = {
	movies: PropTypes.array.isRequired,
}


/*
    <Box component="ul" 
    sx={{
      display: 'grid',
      gridAutoFlow: 'column',
      overflowX: 'scroll',
      gap: theme => theme.spacing(2)
      //gridTemplateColumns: 'calc(100% / 4.1) !important',
      //gridAutoColumns: 'calc(100% / 4.1)',
    }}>
        {movies?.map(movie => {
          const {id, title, character, poster_path, popularity} = movie;//borrar popularity

          return (
            <Box component="li" key={id}
             
            >
              <img src={`${URL_IMG_POSTER}${poster_path}`} alt={title} />
              <p>{title} - {character} - {popularity}</p>
            </Box>
          )
        })}
    </Box>
*/