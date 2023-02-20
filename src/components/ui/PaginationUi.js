import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paginacion: {
        display: 'flex',
        marginBottom: '20px',
        justifyContent: 'center',
        '& > *': {
            marginTop: theme.spacing(2)
        },
        '& > span': {
            alignSelf: 'center',
            marginLeft: '10px'
        }
    }
}));


const PaginationUi = ({totalPages, currentPage, handlePagination}) => {

    const classes = useStyles();

    return ( 
        <Container maxWidth="xl" className={classes.paginacion}>
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
                component="span">
                    {`${currentPage} de ${totalPages}`}
            </Typography>
        </Container>
     );
}
 
export default PaginationUi;