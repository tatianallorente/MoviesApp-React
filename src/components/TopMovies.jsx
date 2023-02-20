import { Typography } from "@mui/material";


// TODO: TopMovies component
const TopMovies = ({topUrl, topTitle}) => {


  return (
    <Typography variant="h4" color="secondary" component="h3" sx={{borderLeft: '5px solid', paddingLeft: '7px'}} gutterBottom>
      {topTitle}
    </Typography>
  )
    

}

export default TopMovies;