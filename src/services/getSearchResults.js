import { API_KEY } from "../helpers/constants";

export const getSearchResults = async (search, currentPage) => {

	const { titleForm, genreForm, ratingForm, yearForm, withCastForm, orderByForm } = search;

	let url = '';

	if (titleForm.trim() !== '') {
		url = `https://api.themoviedb.org/3/search/movie?query=${titleForm}&api_key=${API_KEY}&page=${currentPage}`;
	} else {
		const parameters = [
			{paramName: 'with_genres', paramValue: genreForm},
			{paramName: 'with_cast', paramValue: withCastForm},
			{paramName: 'vote_average.gte', paramValue: ratingForm},
			{paramName: 'primary_release_year', paramValue: yearForm},
			{paramName: 'sort_by', paramValue: orderByForm},
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

		// console.log({url});
	}

	try {
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return {};
		}
	} catch (error) {
		//console.log(error);
		return {};
	}
}
