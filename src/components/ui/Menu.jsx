import { useState } from "react";
import PropTypes from "prop-types";

import { AppBar, FormControlLabel, FormGroup, Switch, Toolbar, Typography, Box } from '@mui/material';

import tmdb_logo from '../../assets/img/blue_long_1-themoviedatabase.svg';


export const Menu = ({themeMode, setTheme}) => {
	const [switchState, setSwitchState] = useState(themeMode === 'light' ? false : true);

	const handleThemeChange = () => {
		if (themeMode === "dark") {
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
		<AppBar position="static" elevation={0} enableColorOnDark={true}>
			<Toolbar sx={{justifyContent: 'space-between'}}>
				<Typography component="h1" variant="h4">Movies App</Typography>
					<Box component="img" src={tmdb_logo} alt={tmdb_logo} sx={{maxHeight: '3rem'}} ml={2} mr={2} />
				<FormGroup>
					<FormControlLabel
						control={
							<Switch checked={switchState} onChange={handleThemeChange} aria-label="theme mode" color="secondary" />
						}
						label={switchState ? 'Dark mode' : 'Light mode'}
					/>
				</FormGroup>
			</Toolbar>
		</AppBar>
	)
}

Menu.propTypes = {
	themeMode: PropTypes.string,
	setTheme: PropTypes.func,
}
