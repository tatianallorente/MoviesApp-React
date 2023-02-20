import { API_KEY } from "../helpers/constants";


export const useFetchCast = async(buscar_people) => {

    const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${buscar_people}`;

    const resp = await fetch(url);
    const data = await resp.json();

    const results = data.results;

    const people = results.map((person) =>  person.name );

    //console.log(people);
    
    return people;
}