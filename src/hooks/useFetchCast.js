import { API_KEY } from "../helpers/constants";


export const useFetchCast = async(searchCast) => {

    const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchCast}`;

    const resp = await fetch(url);
    const data = await resp.json();

    const results = data.results;

    const cast = results.map((person) =>  person.name );

    //console.log(cast);
    
    return cast;
}