

import {useState, useEffect} from 'react';
import { getRatingsImdb } from '../helpers/getRatingsImdb';


export const useFetchRatings = (imdb_id) => {

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

