import { useState } from "react";
import PropTypes from "prop-types";

import { Alert, Box, Skeleton, Tab, Tabs, Typography } from '@mui/material';

import { URL_REQUIRED_PARAMS, URL_IMG_BACKDROP, API_KEY } from "../../helpers/constants";
import { useFetch } from "../../hooks";


const NoResults = () => <Alert severity="info" sx={{width: '100%'}}>No hay resultados</Alert>;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{minHeight: '225px'}}
    >
      {value === index && (
        <Box
          sx={{
            paddingTop: 3,
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 2,
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}


export const TrailersAndMedia = ({ idMovie }) => {

  const urlYoutube = 'https://www.youtube.com/embed/';
	const urlVideos = `https://api.themoviedb.org/3/movie/${idMovie}/videos${URL_REQUIRED_PARAMS}`;
	const urlImages = `https://api.themoviedb.org/3/movie/${idMovie}/images?api_key=${API_KEY}&include_image_language=es,null`;

  const { data:videosData={}, loading:loadingVideos, error:errorVideos } = useFetch(urlVideos);
  const { data:imagesData={}, loading:loadingImages, error:errorImages } = useFetch(urlImages);

  const [tabValue, setTabValue] = useState(0);

  const { results:videos=[] } = videosData || {};
  const { backdrops=[], posters=[] } = imagesData || {};

  const trailers = videos?.filter(video => video.type === 'Trailer') || [];
  const clips = videos?.filter(video => video.type === 'Clip') || [];


  const changeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };


	return (
    <Box mb={3}>
      <Typography variant="h6" component="h3" color="secondary" gutterBottom>
        Media
      </Typography>

      {loadingVideos || loadingImages
        ? <Skeleton variant="rounded" height={225} animation="wave" />
        : <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs variant="fullWidth" value={tabValue} onChange={changeTabValue}>
                <Tab label={`Tráilers (${trailers?.length})`} id="simple-tab-0" />
                <Tab label={`Clips (${clips?.length})`} id="simple-tab-1" />
                <Tab label={`Imágenes de fondo (${backdrops?.length})`} id="simple-tab-2" />
                <Tab label={`Pósters (${posters?.length})`} id="simple-tab-3" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {trailers?.length > 0 && errorVideos === null
                ? trailers?.map(trailer =>
                    <iframe key={trailer.key} width="400" height="225" src={`${urlYoutube}${trailer.key}`} title={trailer.name} style={{border: 'none', borderRadius: '6px'}}></iframe>
                  )
                : <NoResults />
              }
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {clips?.length > 0 && errorVideos === null
                ?  clips?.map(clip =>
                    <iframe key={clip.key} width="400" height="225" src={`${urlYoutube}${clip.key}`} title={clip.name} style={{border: 'none', borderRadius: '6px'}}></iframe>
                  )
                : <NoResults />
              }
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              {backdrops?.length > 0 && errorImages === null
                ? backdrops?.map(image =>
                    <img src={`${URL_IMG_BACKDROP}${image.file_path}`} style={{maxWidth: '100%', width: '400px', borderRadius: '6px'}} key={image.file_path} />
                  )
                : <NoResults />
              }
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              {posters?.length > 0 && errorImages === null
                ? posters?.map(poster =>
                    <img src={`${URL_IMG_BACKDROP}${poster.file_path}`} style={{maxWidth: '100%', width: '200px', borderRadius: '6px'}} key={poster.file_path} />
                  )
                : <NoResults />
              }
            </TabPanel>
          </>
      }
    </Box>
	)
}

TrailersAndMedia.propTypes = {
	idMovie: PropTypes.string.isRequired,
}