import { API_KEY } from './constants';


export const getPerson = async(buscar_people) => {

    const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${buscar_people}`;

    const resp = await fetch(url);
    const data = await resp.json();

    const people = data.results;

    return people;
}

/*
    Algunos actores salen duplicados, es porque vienen asi de la api, con diferentes ids, y no puedo buscar varios ids a la vez porque tendrian que ser actores que trabajaran juntos en las mismas peliculas
*/