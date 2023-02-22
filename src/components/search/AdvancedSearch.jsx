import { useContext } from "react";
import PropTypes from "prop-types";

import { FormControl, InputLabel, NativeSelect, Button, Input } from '@mui/material';

import { SearchFiltersContext } from "../../context/SearchFiltersContext";
import { ratingNumbers, years, sortBy } from '../../utils/utils';
import { getPerson } from '../../services';


const AdvancedSearch = ({formFiltersValues, handleFiltersChange}) => {

  const { setSearchFilters } = useContext( SearchFiltersContext );

  const { genreForm, ratingForm, yearForm, withCastForm, orderByForm } = formFiltersValues;

  const styles = {
    formControl: {
      marginRight: theme => theme.spacing(2),
    },
  };


  // FIXME: hacer esto de otra forma
  const genres = JSON.parse(localStorage.getItem("moviesGenres")) || []; 

  // OnSubmit
  const searchMovies = e => {
    e.preventDefault();

    let castId = '';

    if (withCastForm.trim() !== '') {
      const autocomplete_cast = document.getElementById("autocomplete-cast");

      if (autocomplete_cast?.options?.length > 0) {
        castId = autocomplete_cast?.options[0].dataset?.value;
      } else {
        castId = withCastForm;
      }
    }

    // FIXME: Vaciar título
    handleFiltersChange({target: {name: 'titleForm', value: ''}});

    // esta función sería la que hace la llamada a la api
    setSearchFilters({
      ...formFiltersValues,
      withCastForm: castId,
      titleForm: ''
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
          people?.map(cast => (
            autocomplete_cast.innerHTML += `<option data-value=${cast.id}>${cast.name}</option>`
          ))
        });

      // Nota: a veces vienen duplicados
      //(5) ["Emma Stone", "Emma Stone", "Emma Stone", "Emma Stone", "Emma Stoneberg"]
    } 
  };
  

  return (
    <>
      <FormControl variant="standard" sx={styles.formControl}>
        <InputLabel shrink htmlFor="genreFormId" color="secondary">Género</InputLabel>
        <NativeSelect
          value={genreForm}
          onChange={handleFiltersChange}
          color="secondary"
          inputProps={{
            name: 'genreForm',
            id: 'genreFormId'
          }}
        >
          <option value="">-Cualquiera-</option>
          {genres?.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <FormControl variant="standard" sx={styles.formControl}>
        <InputLabel shrink htmlFor="ratingFormId" color="secondary">Puntuación</InputLabel>
        <NativeSelect
          value={ratingForm}
          onChange={handleFiltersChange}
          color="secondary"
          inputProps={{
            name: 'ratingForm',
            id: 'ratingFormId',
          }}
        >
          <option value="">-Cualquiera-</option>
          {ratingNumbers.map(num => (
            <option key={num} value={num}>
              +{num}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <FormControl variant="standard" sx={styles.formControl}>
        <InputLabel shrink htmlFor="yearFormId" color="secondary">Año</InputLabel>
        <NativeSelect
          value={yearForm}
          onChange={handleFiltersChange}
          color="secondary"
          inputProps={{
            name: 'yearForm',
            id: 'yearFormId',
          }}
        >
          <option value="">-Cualquiera-</option>
          {years().map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          <option value="1940">1940</option>
        </NativeSelect>
      </FormControl>

      <FormControl variant="standard" sx={styles.formControl}>
        <InputLabel shrink htmlFor="orderByFormId" color="secondary">Orden</InputLabel>
        <NativeSelect
          value={orderByForm}
          onChange={handleFiltersChange}
          color="secondary"
          inputProps={{
            name: 'orderByForm',
            id: 'orderByFormId',
          }}
        >
          {sortBy.map(sort => (
            <option key={sort.value} value={sort.value}>
              {sort.index}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <FormControl variant="standard" sx={styles.formControl}>
        <InputLabel shrink htmlFor="withCastFormId" color="secondary">Actor/Actriz</InputLabel>
        <Input 
          list="autocomplete-cast" 
          id="withCastFormId"
          name="withCastForm"
          value={withCastForm}
          color="secondary"
          onChange={handleFiltersChange}
          onKeyUp={handleKeyUp}
          inputProps={{
            list: "autocomplete-cast"
          }}
        />
        <datalist id="autocomplete-cast"></datalist>
      </FormControl>

      <Button variant="contained" color="secondary" onClick={searchMovies} disableElevation>
        Buscar
      </Button>
    </>
  )
}

AdvancedSearch.propTypes = {
  formFiltersValues: PropTypes.object.isRequired,
  handleFiltersChange: PropTypes.func.isRequired
}


export default AdvancedSearch;
