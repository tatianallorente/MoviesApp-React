import { API_KEY } from "../helpers/constants";

export const getPerson = async (searchCast) => {

    const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchCast}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const person = await response.json();
        return person.results;
      } else {
        return [];
      }
    } catch (error) {
      //console.log(error);
      return [];
    }
}

/*
    Algunos actores salen duplicados, es porque vienen asi de la api, con diferentes ids,
    y no puedo buscar varios ids a la vez porque tendrian que ser actores que trabajaran juntos en las mismas peliculas
*/