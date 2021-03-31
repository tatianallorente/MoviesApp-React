import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

import no_img from '../../img/no_img.png';
import { useFetch } from '../../hooks/useFetch';


const useStyles = makeStyles((theme) => ({
    title: {
      //color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    rating: {
        //color: 'pink'
    },
    topSlider: {
        flexWrap:'nowrap',
        overflow:'hidden'
    },
    topTitle: {
        fontSize: '2rem',
        margin: '20px 0 10px 0',
        borderLeft: '5px solid',
        paddingLeft: '7px'
    }
}));


export const TopMovies = ({topUrl, topTitle}) => {

    // Con el hook useFetch
    const {data} = useFetch(topUrl);
    const topMovies = data 
                        ? data.results.filter((result) =>  result.backdrop_path ) 
                        : [];


    const classes = useStyles();

    return (
        <>
            <Typography variant="h3" color="secondary" component="h3" className={classes.topTitle}>
                {topTitle}
            </Typography>
            <Grid container spacing={0} className={classes.topSlider}> 
                {(topMovies.length > 0) ?
                    topMovies.slice(0, 6).map(image => (
                        <Grid item xs={3} xl={2} key={image.id} >
                            <GridList className={classes.gridList} cols={1}>
                            <GridListTile key={image.id} >
                                <img src={image.backdrop_path ? `https://image.tmdb.org/t/p/w500${image.backdrop_path}` : no_img} alt={image.title} className=""/>
                                <GridListTileBar
                                    title={image.title}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton aria-label={`star ${image.title}`} color="secondary">
                                            <StarIcon className={classes.title} color="secondary"/>
                                            <span className={classes.rating}>{image.vote_average}</span>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            </GridList>
                        </Grid>
                    ))
                : null}
            </Grid>
        </>
    )
    

}

