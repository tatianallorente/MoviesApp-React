import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Box, Chip, Paper, Typography, Skeleton, Tooltip } from '@mui/material';

import { URL_IMG_POSTER_SMALL } from "../../helpers/constants";


export const CreditList = ({ cast, loading }) => {

  const [ castGroupedByYear, setCastGroupedByYear ] = useState([]);
  
  
  useEffect(() => {
    if (cast?.length > 0) {
      const castWithYear = cast.map(credit => {
        const date = credit.release_date.split('-');
        const year = date[0];
        
        return {...credit, year};
      });

      const castWithYearSorted = castWithYear.sort((a,b)=> b.year - a.year).filter(credit => credit.year !== '');

      setCastGroupedByYear(castWithYearSorted);
    }
  }, [cast])
  

	return (
    <Box mt={3}>
      <Typography variant="h6" component="h3" color="secondary">
        {loading ? <Skeleton variant="text" width="20%" /> : 'Interpretación:'}
      </Typography>

      <Paper elevation={0} sx={{width: '100%', py: 2, mb: 4}}>
        {loading && [47, 40, 45, 48, 51, 49, 42, 50, 38, 43].map((percent, index) =>
          <Skeleton variant="text" width={`${percent}%`} sx={{marginBottom: 1}} key={index} />
        )}
        {!loading && castGroupedByYear?.map(credit => {
          const { year, character, id, title, poster_path, overview } = credit;

          return (
            <Box key={id} mb={1.5}>
              <Chip size="large" label={year ? year : 'N/A'} sx={{marginRight: 1.5}} />
              <Tooltip
                placement="left"
                arrow
                title={!poster_path && overview === ''
                  ? ''
                  : <Box p={1} display="flex">
                      {poster_path &&
                        <img
                          src={`${URL_IMG_POSTER_SMALL}${poster_path}`}
                          alt={title}
                          style={{
                            borderRadius: '6px',
                            maxHeight: '150px'
                          }}
                        />
                      }
                      <Box pl={2} sx={{overflow: 'hidden'}}>
                        <Typography
                          variant="h6"
                          component="h4"
                          color="secondary"
                          sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography variant="body2">
                          {overview?.length > 290 ? `${overview?.substr(0, 290)}...` : overview}
                        </Typography>
                      </Box>
                    </Box>
                }
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      maxWidth: 500
                    }
                  }
                }}
              >
                <Typography component="span" sx={{fontWeight: 500, '&:hover': {color: theme => theme.palette.primary.main} }}>
                  <Link to={`/movie/${id}`}>{title}</Link>
                </Typography>
              </Tooltip>
              {character && 
                <>
                  <Typography component="span" sx={{color: '#aaa'}}> como </Typography>
                  <Typography component="span">{character}</Typography>
                </>
              }
            </Box>
          );
        })}
      </Paper>
    </Box>
	)
}

CreditList.propTypes = {
	cast: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}