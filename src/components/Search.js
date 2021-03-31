import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Error from './ui/Error';
import { useForm } from '../hooks/useForm';
import { useFetch } from '../hooks/useFetch';
import { API_KEY } from '../helpers/constants';
import { getPerson } from '../helpers/getPerson';
import {numeros, years, sortBy} from './utils/utils';


import { fade, makeStyles } from '@material-ui/core/styles';
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
    //minWidth: 120,
    flexGrow: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formulario: {
    padding: '25px 0'
  },
  buscarFiltros: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
}));



const Search = ({guardarFiltros}) => {

    const [error, guardarError] = useState(false);

    // Formulario de filtros
    const [ formFiltersValues, handleFiltersChange ] = useForm( {
        titulo: '',
        genero: '',
        puntuacion: '',
        year: '',
        with_cast: '',
        orden: 'popularity.desc'
    } );
  
    
    const { titulo, genero, puntuacion, year, with_cast, orden } = formFiltersValues;

    // Get genres to fill select
    // Con el hook useFetch
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const {data} = useFetch(url);
    const genres = data ? data.genres : [];
 

    // OnSubmit
    const buscarPeliculas = e => {
        e.preventDefault();
        console.log('formFiltersValues');
        console.log(formFiltersValues);

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
        guardarFiltros({
            ...formFiltersValues,
            with_cast: with_castId
        });
    }

      
    // Autocompletado
    const handleKeyUp = (e) => {
        //console.log(e);
        const buscar_people = e.target.value;
        // Cuando haya mas de 3 letras, autocompletar
        if (buscar_people.length > 2) {
            
            // Llenar autocompletado aquí con people
            // tengo un datalist con id: autocomplete-cast
            let autocomplete_cast = document.getElementById("autocomplete-cast");
            autocomplete_cast.innerHTML = '';

            // llamar api get actores
            getPerson(buscar_people)
                .then((people) => {
                   people.map(cast => (
                        autocomplete_cast.innerHTML += `<option data-value=${cast.id}>
                            ${cast.name}
                        </option>`
                    ))
                });
  
            // OJO, a veces vienen duplicados
            //(5) ["Emma Stone", "Emma Stone", "Emma Stone", "Emma Stone", "Emma Stoneberg"]
        } 
    };


    const classes = useStyles();

   
    return (
        <Container maxWidth="md">
        <form onSubmit={buscarPeliculas} className={classes.formulario}>
           <Typography variant="h6" color="textSecondary" component="h6">
           Buscar por título
            </Typography>
            <Box marginBottom={'20px'}>
                <TextField 
                    id="standard-basic"
                    name="titulo" 
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
                <Box className={classes.buscarFiltros}>
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
                            {numeros.map(num => (
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
                        <InputLabel shrink htmlFor="orden-native-label-placeholder" color="secondary">
                            Orden
                        </InputLabel>
                        <NativeSelect
                            value={orden}
                            onChange={handleFiltersChange}
                            color="secondary"
                            inputProps={{
                                name: 'orden',
                                id: 'orden-native-label-placeholder',
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
                        onClick={buscarPeliculas}
                    >
                        Buscar
                    </Button>

                </Box>



            {error ? <Error mensaje="Debe haber al menos un campo de búsqueda"/> : null}
        </form>
        </Container>
    )
}

Search.propTypes = {
    guardarFiltros: PropTypes.func.isRequired
}

export default Search;

