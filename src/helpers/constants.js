export const API_KEY = '0799b15d3091f6948d82b2274f8e5226';

export const URL_REQUIRED_PARAMS = `?language=es-ES&api_key=${API_KEY}`;

export const URL_IMG_BACKDROP = 'https://image.tmdb.org/t/p/original';
export const URL_IMG_POSTER = 'https://image.tmdb.org/t/p/w500';

export const URL_GENRES = `https://api.themoviedb.org/3/genre/movie/list${URL_REQUIRED_PARAMS}`;

export const URL_DISCOVER_MOVIES = `https://api.themoviedb.org/3/discover/movie${URL_REQUIRED_PARAMS}&sort_by=popularity.desc`;
export const URL_DISCOVER_RATING = `https://api.themoviedb.org/3/discover/movie${URL_REQUIRED_PARAMS}&certification_country=US&certification=R&sort_by=vote_average.desc&vote_count.gte=18000`;
