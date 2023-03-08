import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import tmdb_logo from '../../assets/img/blue_long_1-themoviedatabase.svg';
import { SearchFiltersContext } from "../../context/SearchFiltersContext";

export const Menu = ({themeMode, setTheme}) => {

  const { setSearchFilters } = useContext( SearchFiltersContext );

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
				<Typography
					component="h1"
					variant="h4"
					sx={(theme) => ({
						[theme.breakpoints.down('md')]: {
							display: 'none',
						},
					})}
					>
						Movies App
					</Typography>
					<Link to="/" style={{display:'contents'}} onClick={() => setSearchFilters({})}>
						<Box component="img" src={tmdb_logo} alt={tmdb_logo} ml={2} mr={2}
							sx={(theme) => ({
								maxHeight: '3rem',
								[theme.breakpoints.down('md')]: {
									maxHeight: '2rem',
								},
							})}
						/>
					</Link>
					<Button
						variant="outlined"
						color="secondary"
						startIcon={switchState ? <DarkModeIcon color="secondary"/> : <LightModeIcon color="secondary"/>}
						onClick={handleThemeChange}
						sx={{
							border: 'none',
							textTransform: 'capitalize',
							':hover': {
								border: 'none',
							}
						}}
					>
						{switchState ? 'Dark mode' : 'Light mode'}
					</Button>
			</Toolbar>
		</AppBar>
	)
}

Menu.propTypes = {
	themeMode: PropTypes.string,
	setTheme: PropTypes.func,
}
