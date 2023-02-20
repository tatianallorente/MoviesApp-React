import { API_KEY } from "../helpers/constants";

export const getDetailedMovie = async (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
	const url_cast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;

	let movieDefault = {};
	let castDefault = [];

	try {
		const [movie, cast] = await Promise.all([
			fetch(url)
				.then(response => response.ok ? response.json() : movieDefault)
				.catch(error => movieDefault), 
			fetch(url_cast)
				.then(async (response) => {
					if (response.ok) {
						const jsonCast = await response.json();
						return jsonCast?.cast?.filter((result) => result.profile_path);
					} else {
						return castDefault;
					}
				})
				.catch(error => castDefault)
		]);

		return {
			movie,
			cast
		};
	} catch (error) {
		//console.log(error);
		return {
			movie: movieDefault,
			cast: castDefault
		};
	}
}
