import PropTypes from "prop-types";

import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const TitleSearch = ({formFiltersValues, handleFiltersChange, searchMovies}) => {

  const { titleForm } = formFiltersValues;


  return (
    <>
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
      
      <Button variant="contained" color="secondary" onClick={searchMovies} disableElevation>
        Buscar
      </Button>
    </>
  )
}

TitleSearch.propTypes = {
  formFiltersValues: PropTypes.object.isRequired,
  handleFiltersChange: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired
}


export default TitleSearch;
