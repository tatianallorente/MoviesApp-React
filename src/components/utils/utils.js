
// Array de años
export const years = () => {  
    let yearCurrent = new Date().getFullYear(); 
    let yearStart = 1940;

    return Array(yearCurrent - yearStart)
        .fill()
        .map(() => yearCurrent--);
}

// Array de puntuacion
export const numeros = [1,2,3,4,5,6,7,8,9];


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

