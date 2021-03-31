import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


import tmdb_logo from '../../img/tmdb_logo_blue_square_2.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '3rem'
  },
  logo: {
    maxWidth: '5rem',
  }
}));


const Menu = ({theme, setTheme}) => {

    const classes = useStyles();

    const handleChange = (event) => {
		setTheme(event.target.checked);
	    //TODO: guardar si es menu dark o light en el localstorage
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
            <img src={tmdb_logo} alt={tmdb_logo} className={classes.logo}/> 
            <Typography variant="h2" className={classes.title}>
                Movies App
            </Typography>
            <FormGroup>
                <FormControlLabel
                    control={
                    <Switch checked={theme} onChange={handleChange} aria-label="login switch" />
                    }
                    label={theme ? 'Dark mode' : 'Light mode'}
                />
            </FormGroup>
            </Toolbar>
        </AppBar>
    )
}

export default Menu
