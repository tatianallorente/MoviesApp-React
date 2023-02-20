import {useState, useEffect} from 'react';
import { getRatingsImdb } from '../services';


export const useFetchRatings = (imdb_id) => {

	const [state, setState] = useState({ ratings: [], loadingRatings: true });

  useEffect( () => {
    getRatingsImdb(imdb_id) 
      .then( ratings => {
        //console.log(ratings);
        setState({
          ratings: ratings,
          loadingRatings: false
        });
      })
  }, [imdb_id]) 

  return state;
}

