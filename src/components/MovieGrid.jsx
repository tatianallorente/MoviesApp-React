import { useContext, useEffect, useState } from 'react';

import { Alert, Container, Grid, LinearProgress, Typography } from '@mui/material';

import { SearchFiltersContext } from '../context/SearchFiltersContext';
import { PaginationUi } from './ui';
import MovieGridItem from './MovieGridItem';
import { getSearchResults } from '../services/getSearchResults';


const MovieGrid = () => {

  const { searchFilters } = useContext( SearchFiltersContext );

	const { titleForm } = searchFilters;

	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalResults: 1,
	});
	const { currentPage, totalPages, totalResults } = pagination;


	useEffect(() => {
		getSearchResults(searchFilters, currentPage)
			.then(data => {
				const { results, total_pages, total_results } = data;

				setMovies(results);
				setPagination({
					...pagination,
					totalPages: total_pages,
					totalResults: total_results
				});
				setLoading(false);

				// TODO: hacer scroll al principio de la búsqueda al cambiar de página

			});

	}, [searchFilters, currentPage]);

	const handlePagination = (e, value) => {
		setPagination({...pagination, currentPage: value});
	};


	return (
		<>
			{titleForm && 
				<Typography variant="h4" color="textPrimary" component="h4" gutterBottom>
					Resultados para:&nbsp;
					<Typography variant="h4" color="secondary" component="span" gutterBottom>
						{titleForm}
					</Typography>
				</Typography>
			}

			{loading &&
				<LinearProgress color="secondary" />
			}

			{movies?.length > 0 &&
				<>
					<Container maxWidth="xl" sx={{textAlign: 'center', marginTop: '10px'}}>
						<Typography variant="h6" color="primary" component="h6" gutterBottom>
							{totalResults} películas encontradas
						</Typography>
					</Container>

					<PaginationUi
						totalPages={totalPages}
						currentPage={currentPage}
						handlePagination={handlePagination}
					/>

					<Grid container spacing={3}>
						{movies?.map( movie => (
							<Grid item xs={4} sm={3} xl={2} key={movie.id}>
								<MovieGridItem
									key={movie.id}
									{...movie}
								/>
							</Grid>
						))}
					</Grid>
							
					<PaginationUi
						totalPages={totalPages}
						currentPage={currentPage}
						handlePagination={handlePagination}
					/>
				</>
			}

			{!loading && movies?.length < 1 &&
				<Container maxWidth="md" sx={{textAlign: 'center', marginTop: '10px'}}>
					<Alert severity="warning">No se encontraron resultados</Alert>
				</Container>
			}
		</>
	)
}

export default MovieGrid;

