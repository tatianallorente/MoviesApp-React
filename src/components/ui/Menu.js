import React, {useState} from 'react';
import PropTypes from "prop-types";

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
		fontSize: '2.5rem'
	},
	logo: {
		maxWidth: '5rem',
	}
}));


const Menu = ({theme, setTheme, existingPreference}) => {

    const classes = useStyles();

    const [switchState, setSwitchState] = useState(existingPreference === 'light' ? false : true);

    const handleThemeChange = () => {
		if (theme === "dark") {
			setSwitchState(false);
			setTheme("light");
			localStorage.setItem("moviesThemeMode", "light");
		} else {
			setSwitchState(true);
			setTheme("dark");
			localStorage.setItem("moviesThemeMode", "dark");
		}
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
                      	<Switch checked={switchState} onChange={handleThemeChange} aria-label="theme" />
                    }
                    label={switchState ? 'Dark mode' : 'Light mode'}
                />
            </FormGroup>
            </Toolbar>
        </AppBar>
    )
}

Menu.propTypes = {
	theme: PropTypes.string,
  	setTheme: PropTypes.func,
  	existingPreference: PropTypes.string
}

export default Menu;
