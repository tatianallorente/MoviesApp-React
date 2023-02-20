import { API_KEY } from "../../helpers/constants";

export const getDetailedMovie = async(id) => {

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    const resp = await fetch(url);
    const jsonMovie = await resp.json();

    return jsonMovie;

}



