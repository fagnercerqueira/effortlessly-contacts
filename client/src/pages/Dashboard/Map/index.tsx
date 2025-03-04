import { Box, Typography } from '@mui/material';
import { useContactContext } from '../../../hooks/use-contat-context';
import { AdvancedMarker, APIProvider, Map as GMap } from '@vis.gl/react-google-maps';



function Map () {
  const GOOGLE_MAPS_API_KEY : string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const { pickedContact, contactList } = useContactContext();
  
  const DEFAULT_CENTER = {lat: -15.793889, lng: -47.882778};
  const DEFAULT_ZOOM = 4;
  const DEFAULT_ZOOM_WITH_LOCATION = 16;

  return (
    <Box 
      sx={{ 
        height: '100%', 
        width: '100%', 
        position: 'relative',
        bgcolor: '#f0f0f0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {contactList.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Adicione contatos para visualizá-los no mapa
        </Typography>
      ) : (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <GMap center={pickedContact ?? DEFAULT_CENTER}
            zoom={pickedContact ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM} 
            mapId="G_MAP"
            gestureHandling="none"
            disableDefaultUI
            fullscreenControl={false}
            zoomControl={false}
            >
            {contactList.map((item, index)=> {
              return <AdvancedMarker position={{ lat: item.latitude, lng: item.longitude }} key={index}/>
            })}
          </GMap>
        </APIProvider>
      )}
    </Box>
  );
};

export default Map;