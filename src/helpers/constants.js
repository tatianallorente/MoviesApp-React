export const API_KEY = '0799b15d3091f6948d82b2274f8e5226';

export const URL_IMG_BACKDROP = 'https://image.tmdb.org/t/p/original';
export const URL_IMG_POSTER = 'https://image.tmdb.org/t/p/w500';

export const URL_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

// añadir urls api
/*

// Get genres to fill select
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

// busqueda por titulo
url = `https://api.themoviedb.org/3/search/movie?query=${titleForm}&api_key=${API_KEY}&page=${currentPage}`;
// busqueda avanzada
url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentPage}`;

// buscar los actores de una pelicula
const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    
// detalles pelicula
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

// autocompletado get actores
const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchCast}`;

// portada top movies
const urlNew = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const urlRating = `https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&vote_count.gte=18000&api_key=${API_KEY}`;
const urlTrending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
*/

export const URL_DISCOVER_MOVIES = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
export const URL_DISCOVER_RATING = `https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&vote_count.gte=18000&api_key=${API_KEY}`;


/*
const getURLSearchTitle = (titleForm, currentPage) =>`https://api.themoviedb.org/3/search/movie?query=${titleForm}&api_key=${API_KEY}&page=${currentPage}`;
const getURLAdvancedSearch = (currentPage) => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentPage}`;

const getURLMovieCast = (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;

const getURLMovieDetails = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

const getURLAutocompleteCast = (searchCast) => `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchCast}`;
*/