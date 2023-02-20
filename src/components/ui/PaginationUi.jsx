import { Container, Pagination, Typography } from "@mui/material";

export const PaginationUi = ({totalPages, currentPage, handlePagination}) => {

	return ( 
		<Container
			maxWidth="xl"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				margin: theme => theme.spacing(3, 0)
			}}
			>
				<Pagination 
					variant="outlined" 
					shape="rounded" 
					siblingCount={2} 
					boundaryCount={2} 
					count={totalPages} 
					page={currentPage} 
					onChange={handlePagination}
				/>
				<Typography 
					variant="body2" 
					color="textPrimary" 
					component="span"
					sx={{
						alignSelf: 'center',
						marginLeft: '10px'
					}}
				>
					{`${currentPage} de ${totalPages}`}
				</Typography>
			</Container>
		);
}
 