import { SetStateAction } from 'react';
import { 
  Box,
  Button, 
  IconButton, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { Contact } from '../types';

type ContactDialogProps = {
  open: boolean,
  newContact: Partial<Contact | null>; 
  onClose: React.Dispatch<SetStateAction<boolean>>,
  setNewContact: React.Dispatch<SetStateAction<Partial<Contact>>>;
  handleAddContact: React.Dispatch<SetStateAction<Partial<Contact>>>;
}

function ContactDialog({ open, newContact, onClose, setNewContact, handleAddContact } : ContactDialogProps){

    return(
        <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Adicionar Novo Contato
          <IconButton
            aria-label="close"
            onClick={() => onClose(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="name">Nome*</InputLabel>
                  <OutlinedInput
                    id="name"
                    value={newContact?.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    label="Nome*"
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    id="email"
                    value={newContact?.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    label="Email"
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="phone">Telefone</InputLabel>
                  <OutlinedInput
                    id="phone"
                    value={newContact?.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    label="Telefone"
                  />
                </FormControl>
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="cep">Endereço*</InputLabel>
                  <OutlinedInput
                    id="cep"
                    value={newContact?.cep}
                    onChange={(e) => setNewContact({...newContact, cep: parseFloat(e.target.value)})}
                    label="Endereço*"
                    rows={2}
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="latitude">Latitude</InputLabel>
                  <OutlinedInput
                    id="latitude"
                    type="number"
                    value={newContact?.latitude || ''}
                    onChange={(e) => setNewContact({...newContact, latitude: parseFloat(e.target.value)})}
                    label="Latitude"
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="longitude">Longitude</InputLabel>
                  <OutlinedInput
                    id="longitude"
                    type="number"
                    value={newContact?.longitude || ''}
                    onChange={(e) => setNewContact({...newContact, longitude: parseFloat(e.target.value)})}
                    label="Longitude"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancelar</Button>
          <Button variant="contained" type="submit">Adicionar</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ContactDialog;