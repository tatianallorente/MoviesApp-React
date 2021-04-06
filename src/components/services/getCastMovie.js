import { API_KEY } from "../../helpers/constants";

export const getCastMovie = async(id) => {
       
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    const response = await fetch(url);
    const jsonCast = await response.json();
    const cast = jsonCast.cast.filter((result) => result.profile_path );

    return cast;
    
}

