// Array de años
export const years = () => {
	let yearCurrent = new Date().getFullYear();
	let yearStart = 1940;

	return Array(yearCurrent - yearStart)
		.fill()
		.map(() => yearCurrent--);
}

// Array de puntuación
export const ratingNumbers = [1,2,3,4,5,6,7,8,9];

// Default: popularity.desc
export const sortBy =
	[
		{index: 'Popularidad DESC', value: 'popularity.desc'},
		{index: 'Popularidad ASC', value: 'popularity.asc'},
		{index: 'Fecha de estreno DESC', value: 'primary_release_date.desc'},
		{index: 'Fecha de estreno ASC', value: 'primary_release_date.asc'},
		{index: 'Título original DESC', value: 'original_title.desc'},
		{index: 'Título original ASC', value: 'original_title.asc'},
		{index: 'Puntuación DESC', value: 'vote_average.desc'},
		{index: 'Puntuación ASC', value: 'vote_average.asc'}
	];

export const convertMinsToTime = (mins) => {
	let hours = Math.floor(mins / 60);
	let minutes = mins % 60;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return `${hours}h ${minutes}mins`;
}

export const dateFormatted = (date, dateStyle='') => {
	// dateStyle: full, long, medium, short

	if (dateStyle !== '') {
		const options = { dateStyle: dateStyle };
		return new Date(date).toLocaleDateString('es-ES', options);
	} else {
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Date(date).toLocaleDateString('es-ES', options).replaceAll("/", "-");
	}
}

export const calculateAge = (birthday, deathday='') => {
	const birthDate = new Date(birthday);
	const currentDate = deathday ? new Date(deathday) : Date.now();

	const milliseconds = currentDate - birthDate.getTime();
	const ageDate = new Date(milliseconds);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const getGenresByIds = (genresIds) => {
	const genresSaved = JSON.parse(localStorage.getItem("moviesGenres")) || [];

	return genresSaved.filter(genre => genresIds.includes(genre.id) === true);
}