import { useContext, useEffect, useState } from "react";

import { Box, Container, TextField, InputAdornment, Tabs, Tab, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import { SearchFiltersContext } from "../../context/SearchFiltersContext";
import { useForm } from '../../hooks';
import AdvancedSearch from "./AdvancedSearch";
import { URL_GENRES } from "../../helpers/constants";

const Search = () => {

  const { setSearchFilters } = useContext( SearchFiltersContext );

  const [tabValue, setTabValue] = useState(0);

  // Formulario de filtros
  const [ formFiltersValues, handleFiltersChange, resetForm ] = useForm( {
    titleForm: '',
    genreForm: '',
    ratingForm: '',
    yearForm: '',
    withCastForm: '',
    orderByForm: 'popularity.desc'
  } );
  
  const { titleForm } = formFiltersValues;

  
  useEffect(() => {
    // Get genres to fill select
    fetch( URL_GENRES )
      .then( resp => resp.json() )
      .then( data => {
        const moviesGenres = data?.genres || [];
        localStorage.setItem("moviesGenres", JSON.stringify(moviesGenres));
      });
  }, []);

  const changeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  // OnSubmit
  const searchMovies = e => {
    e.preventDefault();

    // esta función sería la que hace la llamada a la api
    setSearchFilters(formFiltersValues);
  }

  const resetFormAndCleanSearch = () => {
    setSearchFilters({});
    resetForm();
  }
  
  // TODO: Buscador de titulo puede ser: Buscar por título o persona (en general, actriz, director, camaras, etc)
  // Devolver todo lo que devuelva la busqueda por categoria


  return (
    <Container maxWidth="md">
      <Box component="form" autoComplete="off" onSubmit={searchMovies} p={theme => theme.spacing(3,0)}>
        <Box>
          <Tabs variant="fullWidth" value={tabValue} onChange={changeTabValue} 
            sx={{
              '& .MuiTab-root': {
                textTransform: 'unset',
                fontSize: '1.25rem',
                fontFamily: 'Merienda, sans-serif'
              }
            }}
          >
            <Tab label="Buscar por título" id="simple-tab-0" />
            <Tab label="Búsqueda avanzada" id="simple-tab-1" />
          </Tabs>
        </Box>

        <Box mt={3} mb={3} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {tabValue === 0
            ? <>
                <TextField 
                  id="titleForm"
                  name="titleForm"
                  variant="standard"
                  value={titleForm}
                  label=" " 
                  placeholder="Escribe algo..."
                  color="secondary"
                  onChange={handleFiltersChange}
                  fullWidth
                  sx={{marginRight: theme => theme.spacing(2)}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button variant="contained" color="secondary" onClick={searchMovies}>
                  Buscar
                </Button>
              </>
            : <AdvancedSearch
                formFiltersValues={formFiltersValues}
                handleFiltersChange={handleFiltersChange}
              />
          }
          {/* // FIXME: Limpiar busqueda */}
          <IconButton aria-label="limpiar búsqueda" title="Limpiar búsqueda" sx={{marginLeft: 1}} onClick={resetFormAndCleanSearch}>
            <SearchOffIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Container>
  )
}


export default Search;
