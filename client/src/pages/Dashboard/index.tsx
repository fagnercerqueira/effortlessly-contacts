import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  TextField, 
  Button, 
  Paper, 
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { 
  Search, 
  PersonAdd, 
} from '@mui/icons-material';
import Map from './Map';
import ContactList from './ContactList';
import ContactDialog from './ContactDialog';
import { Contact } from './types.ts';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact | null>>(null);


  const handleAddContact = () => {
    if(!newContact) return

    if (!newContact.name || !newContact.cep) {
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name || '',
      email: newContact.email || '',
      phone: newContact.phone || '',
      cpf: newContact.cpf || '',
      cep: newContact.cep || 0,
      logradouro: newContact.logradouro || '',
      numero: newContact.numero || '',
      complemento: newContact.complemento || '',
      bairro: newContact.bairro || '',
      cidade: newContact.cidade || '',
      estado: newContact.estado || '',
      latitude: newContact.latitude || Math.random() * 180 - 90,
      longitude: newContact.longitude || Math.random() * 360 - 180
    };

    setContacts([...contacts, contact]);
    setOpenDialog(false);
    setNewContact(null);
    
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

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
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            Lista de Contatos
          </Typography>
          
          <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Buscar contatos..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAdd />}
              onClick={() => setOpenDialog(true)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Novo
            </Button>
          </Box>
          
          <ContactList 
            contacts={filteredContacts} 
            onRemove={handleRemoveContact} 
            onAddNew={() => setOpenDialog(true)}
          />
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
            <Map contacts={contacts} />
          </Paper>
        </Grid>
      </Grid>
      
      <ContactDialog open={openDialog} onClose={setOpenDialog} setNewContact={setNewContact} handleAddContact={handleAddContact}/>
    </Container>
  );
}

export default App;