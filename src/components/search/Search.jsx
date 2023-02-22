import { useContext, useEffect, useState } from "react";

import { Box, Container, Tabs, Tab, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import { SearchFiltersContext } from "../../context/SearchFiltersContext";
import { useForm } from '../../hooks';
import { URL_GENRES } from "../../helpers/constants";
import TitleSearch from "./titleSearch";
import AdvancedSearch from "./AdvancedSearch";


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

  // TODO: Hacer una pagina con estas preguntas https://www.themoviedb.org/documentation/api/discover
  // y mostrar los resultados (poner inputs para cambiar los parámetros)

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
            ? <TitleSearch
                formFiltersValues={formFiltersValues}
                handleFiltersChange={handleFiltersChange}
                searchMovies={searchMovies}
              />
            : <AdvancedSearch
                formFiltersValues={formFiltersValues}
                handleFiltersChange={handleFiltersChange}
              />
          }
        </Box>
        <Button variant="outlined" fullWidth size="small" startIcon={<SearchOffIcon />} onClick={resetFormAndCleanSearch}>
          Limpiar búsqueda
        </Button>
      </Box>
    </Container>
  )
}


export default Search;
