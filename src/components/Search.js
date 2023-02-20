import React from 'react';
import PropTypes from 'prop-types';

//import Error from './ui/Error';
import { useForm } from '../hooks/useForm';
import { useFetch } from '../hooks/useFetch';
import { API_KEY } from '../helpers/constants';
import { getPerson } from './services/getPerson';
import {ratingNumbers, years, sortBy} from './utils/utils';


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import { Input } from '@material-ui/core';

//import Paper from '@material-ui/core/Paper';
//import Accordion from '@material-ui/core/Accordion';
//import AccordionSummary from '@material-ui/core/AccordionSummary';
//import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        flexGrow: 1
    },
    searchForm: {
        padding: '25px 0'
    },
    searchByFilters: {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
}));


const Search = ({setFilters}) => {

    //const [error, guardarError] = useState(false);

    // Formulario de filtros
    const [ formFiltersValues, handleFiltersChange ] = useForm( {
        title: '',
        genero: '',
        puntuacion: '',
        year: '',
        with_cast: '',
        orderBy: 'popularity.desc'
    } );
  
    
    const { title, genero, puntuacion, year, with_cast, orderBy } = formFiltersValues;

    // Get genres to fill select
    // Con el hook useFetch
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const {data} = useFetch(url);
    const genres = data ? data.genres : [];
 

    // OnSubmit
    const searchMovies = e => {
        e.preventDefault();
        /*console.log('formFiltersValues');
        console.log(formFiltersValues);*/

        let with_castId = '';

        if (with_cast.trim() !== '') {
            const autocomplete_cast = document.getElementById("autocomplete-cast");
            // ver si ese [0] esta correcto
            if ( autocomplete_cast.options.length > 0 ) {
                with_castId = autocomplete_cast.options[0].dataset.value;
            } else {
                with_castId = with_cast;
            }
        }

        // esta función sería la que hace la llamada a la api
        setFilters({
            ...formFiltersValues,
            with_cast: with_castId
        });
    }

      
    // Autocompletado
    const handleKeyUp = (e) => {
        //console.log(e);
        const searchCast = e.target.value;
        // Cuando haya más de 3 letras, autocompletar
        if (searchCast.length > 2) {
            
            // Llenar autocompletado aquí con searchCast
            // tengo un datalist con id: autocomplete-cast
            let autocomplete_cast = document.getElementById("autocomplete-cast");
            autocomplete_cast.innerHTML = '';

            // llamar api get actores
            getPerson(searchCast)
                .then((people) => {
                   people.map(cast => (
                        autocomplete_cast.innerHTML += `<option data-value=${cast.id}>
                            ${cast.name}
                        </option>`
                    ))
                });
  
            // Nota: a veces vienen duplicados
            //(5) ["Emma Stone", "Emma Stone", "Emma Stone", "Emma Stone", "Emma Stoneberg"]
        } 
    };


    const classes = useStyles();

   
    return (
        <Container maxWidth="md">
        <form onSubmit={searchMovies} className={classes.searchForm}>
           <Typography variant="h6" color="textSecondary" component="h6">
           Buscar por título
            </Typography>
            <Box marginBottom={'20px'}>
                <TextField 
                    id="standard-basic"
                    name="title" 
                    label="Buscar por titulo"
                    color="secondary"
                    onChange={handleFiltersChange}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                />
            </Box>
            
            <Typography variant="h6" color="textSecondary" component="h6">
                Buscar por filtros
            </Typography>
                <Box className={classes.searchByFilters}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="genre-native-label-placeholder" color="secondary">
                            Género
                        </InputLabel>
                        <NativeSelect
                            value={genero}
                            onChange={handleFiltersChange}
                            color="secondary"
                            inputProps={{
                                name: 'genero',
                                id: 'genre-native-label-placeholder'
                            }}
                        >
                            <option value="">-Cualquiera-</option>
                            {genres.map(genre => (
                                <option 
                                    key={genre.id} 
                                    value={genre.id} 
                                >{genre.name}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>


                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="puntuacion-native-label-placeholder" color="secondary">
                            Puntuación
                        </InputLabel>
                        <NativeSelect
                            value={puntuacion}
                            onChange={handleFiltersChange}
                            color="secondary"
                            inputProps={{
                                name: 'puntuacion',
                                id: 'puntuacion-native-label-placeholder',
                            }}
                        >
                            <option value="">-Cualquiera-</option>
                            {ratingNumbers.map(num => (
                                <option 
                                    key={num} 
                                    value={num} 
                                >+{num}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>


                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="year-native-label-placeholder" color="secondary">
                            Año
                        </InputLabel>
                        <NativeSelect
                            value={year}
                            onChange={handleFiltersChange}
                            color="secondary"
                            inputProps={{
                                name: 'year',
                                id: 'year-native-label-placeholder',
                            }}
                        >
                            <option value="">-Cualquiera-</option>
                            {years().map(year => (
                                <option 
                                    key={year} 
                                    value={year} 
                                >{year}</option>
                            ))
                            }
                            
                            <option value="1940">1940</option>
                        </NativeSelect>
                    </FormControl>


                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="orderBy-native-label-placeholder" color="secondary">
                            Orden
                        </InputLabel>
                        <NativeSelect
                            value={orderBy}
                            onChange={handleFiltersChange}
                            color="secondary"
                            inputProps={{
                                name: 'orderBy',
                                id: 'orderBy-native-label-placeholder',
                            }}
                        >
                            {sortBy.map(sort => (
                                <option 
                                    key={sort.value} 
                                    value={sort.value} 
                                >{sort.index}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>


                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="with_cast" color="secondary">
                            Actor/Actriz
                        </InputLabel>
                        <Input 
                            list="autocomplete-cast" 
                            id="with_cast"
                            name="with_cast"
                            color="secondary"
                            onChange={handleFiltersChange}
                            onKeyUp={handleKeyUp}
                            inputProps={{
                                list: "autocomplete-cast"
                            }}
                        />
                        <datalist id="autocomplete-cast"></datalist>
                    </FormControl>


                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={searchMovies}
                    >
                        Buscar
                    </Button>

                </Box>



            {/*error ? <Error mensaje="Debe haber al menos un campo de búsqueda"/> : null*/}
        </form>
        </Container>
    )
}

Search.propTypes = {
    setFilters: PropTypes.func.isRequired
}

export default Search;

