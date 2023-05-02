import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Typography, Box, Button, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import tmdb_logo from '../../assets/img/blue_long_1-themoviedatabase.svg';
import { SearchFiltersContext } from "../../context/SearchFiltersContext";

export const Menu = ({themeMode, setTheme}) => {
  let navigate = useNavigate();
  let location = useLocation();
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

	const goHome = () => {
		setSearchFilters({});
		navigate('/');
	}

	const handleGoBack = () => {
    navigate(-1);
  };

	return (
		<>
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
					<Box component="img" src={tmdb_logo} alt={tmdb_logo} ml={2} mr={2} onClick={goHome}
						sx={(theme) => ({
							cursor: 'pointer',
							maxHeight: '3rem',
							[theme.breakpoints.down('md')]: {
								maxHeight: '2rem',
								marginLeft: 0,
							},
							[theme.breakpoints.down('sm')]: {
								maxHeight: '1rem',
							},
						})}
					/>
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

			{location.key !== "default" &&
				<Tooltip title="Atrás" placement="right" arrow>
					<Box
						sx={(theme) => ({
							position: "absolute",
							padding: theme.spacing(0.5, 2),
							paddingRight: 0,
						})}
					>
						<IconButton aria-label="Atrás" onClick={handleGoBack}>
							<ArrowBackIosNewIcon />
						</IconButton>
					</Box>
				</Tooltip>
			}
		</>
	)
}

Menu.propTypes = {
	themeMode: PropTypes.string,
	setTheme: PropTypes.func,
}
