import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Divider, 
  Paper, 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Map from './Map';
import ContactList from './ContactList';
import ContactDialog from './ContactDialog';


function App() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Contatos
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Gerencie seus contatos e visualize-os no mapa.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        <Grid size={5}>
          <ContactList setOpenDialog={setOpenDialog}/>
        </Grid>
        
        <Grid size={7}>
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Visualização no Mapa
          </Typography>
          
          <Paper 
            elevation={2} 
            sx={{ 
              height: 500, 
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            <Map/>
          </Paper>
        </Grid>
      </Grid>
      
      <ContactDialog open={openDialog} onClose={setOpenDialog}/>
    </Container>
  );
}

export default App;