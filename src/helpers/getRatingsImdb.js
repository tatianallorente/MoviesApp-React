
export const getRatingsImdb = async(imdb_id) => { 

    const url_imdb = `https://www.omdbapi.com/?i=${encodeURI(imdb_id)}&apikey=b7618069`;

    const resp = await fetch(url_imdb);
    const {Ratings} = await resp.json();
    
    //console.log('desde getRatingsImdb')
    //console.log(Ratings)

    Ratings.forEach((r) => {
        if (r.Source === 'Internet Movie Database') {
            r.Source = 'IMDB'
        }
    });

    return Ratings;
};
    /*
    (3) [{…}, {…}, {…}]
    0: {Source: "Internet Movie Database", Value: "5.4/10"}
    1: {Source: "Rotten Tomatoes", Value: "59%"}
    2: {Source: "Metacritic", Value: "60/100"}
    */