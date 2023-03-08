export const API_KEY = '0799b15d3091f6948d82b2274f8e5226';

export const URL_REQUIRED_PARAMS = `?language=es-ES&api_key=${API_KEY}`;

export const URL_IMG_BACKDROP = 'https://image.tmdb.org/t/p/original';
export const URL_IMG_POSTER = 'https://image.tmdb.org/t/p/w500';
export const URL_IMG_POSTER_MEDIUM = 'https://image.tmdb.org/t/p/w300';
export const URL_IMG_POSTER_SMALL = 'https://image.tmdb.org/t/p/w185';

export const URL_GENRES = `https://api.themoviedb.org/3/genre/movie/list${URL_REQUIRED_PARAMS}`;

export const URL_DISCOVER_MOVIES = `https://api.themoviedb.org/3/discover/movie${URL_REQUIRED_PARAMS}&sort_by=popularity.desc`;
export const URL_POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/popular${URL_REQUIRED_PARAMS}`;
export const URL_DISCOVER_RATING = `https://api.themoviedb.org/3/discover/movie${URL_REQUIRED_PARAMS}&sort_by=vote_average.desc&vote_count.gte=20000`;
export const URL_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week${URL_REQUIRED_PARAMS}`;
export const URL_NOWPLAYING_MOVIES = `https://api.themoviedb.org/3/movie/now_playing${URL_REQUIRED_PARAMS}`;
export const URL_UPCOMING_MOVIES = `https://api.themoviedb.org/3/discover/movie${URL_REQUIRED_PARAMS}&region=ES&release_date.gte=2023-03-01&release_date.lte=2023-03-22&sort_by=popularity.desc&with_release_type=3`;//&with_release_type=3
