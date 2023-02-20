import { Box, Link } from '@mui/material';


export const Footer = () => {

	return (
		<Box component="footer" sx={{ color: '#aaa', margin: '2rem auto', textAlign: 'center', width: '70vw' }}>
      &copy; Designed and developed by&nbsp;
      <Link 
        href="https://github.com/tatianallorente/MoviesApp-React"
        target="_blank"
        rel="noreferrer" 
        sx={{ color: theme => theme.palette.text.secondary, textDecoration: 'none', '&:hover': {textDecoration: 'underline'} }}
      >
        Tatiana Llorente
      </Link>
    </Box>
	)
}
