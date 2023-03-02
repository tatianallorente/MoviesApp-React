import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Box, ImageList, ImageListItem, ImageListItemBar, Skeleton, Typography } from '@mui/material';

import { URL_IMG_POSTER_SMALL } from "../../helpers/constants";
import no_img from '../../assets/img/no_img.png';


export const KnownForScroller = ({ cast, loading }) => {

  const navigate = useNavigate();
  const [moviesKnownFor, setMoviesKnownFor] = useState([]);

  useEffect(() => {
    if (cast?.length > 0) {
      const castCopy = [...cast];
      const knownForOrdered = castCopy?.sort((a,b)=> b.popularity - a.popularity).slice(0,10);

      setMoviesKnownFor(knownForOrdered);
    }
  }, [cast]);


	return (
    <Box mt={2}>
      <Typography variant="h6" component="h3" color="secondary">
        {loading ? <Skeleton variant="text" width="25%" /> : 'Conocido/a por:'}
      </Typography>
      <ImageList 
        cols={4}
        gap={16}
        sx={{
          overflowX: loading ? 'hidden' : 'auto',
          marginTop: theme => theme.spacing(1),
          display: 'flex',
          flexWrap: 'nowrap'
        }}
      >
        {loading &&
          [...Array(10).keys()].map((index) => 
            <ImageListItem key={index}>		
              <Skeleton variant="rounded" height={200} width={125} animation="wave" key={index} />
            </ImageListItem>
          )
        }

        {!loading && moviesKnownFor?.map(movie => {
          const {id, title, character, poster_path} = movie;

          return (
            <ImageListItem
              key={id}
              sx={{
                cursor: 'pointer',
                backgroundColor: '#585858',
                borderTopLeftRadius: '6px',
                borderTopRightRadius: '6px',
                '&:hover': {
                  opacity: .5
                },
              }}
              onClick={() => navigate(`/movie/${id}`)}
            >	
              <img
                src={poster_path ? `${URL_IMG_POSTER_SMALL}${poster_path}` : no_img}
                alt={title}
                title={title}
                style={{
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                  width: '125px'
                }}
              />
              <ImageListItemBar
                title={title}
                subtitle={character}
              />
            </ImageListItem>
          )
        })}
      </ImageList>
    </Box>
	)
}

KnownForScroller.propTypes = {
	cast: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}