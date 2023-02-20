import { Typography } from "@mui/material";


// TODO: TopMovies component
const TopMovies = ({topUrl, topTitle}) => {


  return (
    <Typography variant="h3" color="secondary" component="h3">{topTitle}</Typography>
  )
    

}

export default TopMovies;