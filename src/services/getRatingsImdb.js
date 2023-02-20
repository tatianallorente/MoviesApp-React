export const getRatingsImdb = async (imdb_id) => { 

	const url_imdb = `https://www.omdbapi.com/?i=${encodeURI(imdb_id)}&apikey=b7618069`;

	try {
		const response = await fetch(url_imdb);

		if (response.ok) {
			const ratings = await response.json();
			const { Ratings, Metascore, imdbRating } = ratings;

			Ratings?.forEach((item) => {
				if (item.Source === 'Internet Movie Database') {
					item.Source = 'IMDB';
					item.ratingValue = (parseFloat(imdbRating)*5)/10;
				} else if (item.Source === 'Metacritic') {
					item.ratingValue = (parseFloat(Metascore)*5)/100;
				} else if (item.Source === 'Rotten Tomatoes') {
					item.ratingValue = (parseFloat(item.Value)*5)/100;
				} else {
					item.ratingValue = item.Value;
				}
			});

			return Ratings;
		} else {
			return [];
		}
	} catch (error) {
		//console.log(error);
		return [];
	}
};
    /*
    (3) [{…}, {…}, {…}]
    0: {Source: "Internet Movie Database", Value: "5.4/10"}
    1: {Source: "Rotten Tomatoes", Value: "59%"}
    2: {Source: "Metacritic", Value: "60/100"}
    */