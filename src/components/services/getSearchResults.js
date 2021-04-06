import { API_KEY } from "../../helpers/constants";

export const getSearchResults = async(busqueda, currentPage) => {

    const { titulo, genero, puntuacion, year, with_cast, orden } = busqueda;
     
    let url = '';
    if (titulo.trim() !== '') {
        url = `https://api.themoviedb.org/3/search/movie?query=${titulo}&api_key=${API_KEY}&page=${currentPage}`;
    } else {
        const parameters = [
            {paramName: 'with_genres', paramValue: genero},
            {paramName: 'with_cast', paramValue: with_cast},
            {paramName: 'vote_average.gte', paramValue: puntuacion},
            {paramName: 'primary_release_year', paramValue: year},
            {paramName: 'sort_by', paramValue: orden},
        ];        
        
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentPage}`;
        
        // TODO: poner un mínimo de vote_count para buscar por puntuación

        const queryParams = parameters.filter( param => 
            param.paramValue !== '' 
        ).map( param =>
            `${param.paramName}=${encodeURI(param.paramValue)}`
        ).join("&");
        // console.log({queryParams}); // son los que no estan vacíos
    
        if ( queryParams !== '') {
            url += `&${queryParams}`;                               
        }

        console.log({url});
        
    }
    
    const resp = await fetch(url);
    const data = await resp.json();
    
    return data;
}
