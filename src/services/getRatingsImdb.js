export const getRatingsImdb = async (imdb_id) => { 

	const url_imdb = `https://www.omdbapi.com/?i=${encodeURI(imdb_id)}&apikey=b7618069`;

	try {
		const response = await fetch(url_imdb);

		if (response.ok) {
			const { Ratings } = await response.json();

			Ratings?.forEach((item) => {
				if (item.Source === 'Internet Movie Database') {
					item.Source = 'IMDB'
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