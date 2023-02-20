import {useState, useEffect} from 'react';
import { getRatingsImdb } from '../services';


export const useFetchRatings = (imdb_id) => {

  // TODO: añadir loading

  const [state, setState] = useState({
    ratings: []
  })

  useEffect( () => {
    getRatingsImdb(imdb_id) 
      .then( r => {
        //console.log(r);
        setState({
          ratings: r
        });
      })
  }, [imdb_id]) 

  return state;
}

