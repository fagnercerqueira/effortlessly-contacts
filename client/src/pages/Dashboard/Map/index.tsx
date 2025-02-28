import { Box, Typography } from '@mui/material';
import { Contact } from '../../../types/contact-type.ts';


function Map () {
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
      {/* {contacts.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          Adicione contatos para visualizá-los no mapa
        </Typography>
      )} */}
    </Box>
  );
};

export default Map;