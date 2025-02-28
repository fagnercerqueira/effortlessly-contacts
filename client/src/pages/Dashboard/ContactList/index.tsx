import React , { useState, SetStateAction} from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Paper, 
  Divider,
  TextField, 
  Button, 
  InputAdornment
} from '@mui/material';
import {  Search,  PersonAdd, PersonOutline, Add, Delete  } from '@mui/icons-material';
import { useContactContext } from '../../../hooks/use-contat-context';

interface ContactListProps {
    setOpenDialog: React.Dispatch<SetStateAction<boolean>>,
}

function ContactList ({ setOpenDialog } : ContactListProps) {

  const contactList = useContactContext();
  const [searchTerm, setSearchTerm] = useState<string>();
  const onRemove = (id: string) => {
    console.log('[ID]', id);
  }

  console.log('contactList', contactList)

  if (contactList.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >

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

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              bgcolor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <PersonOutline sx={{ fontSize: 30, color: 'text.secondary' }} />
          </Box>
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>
          Nenhum contato adicionado
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Comece adicionando seu primeiro contato
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          sx={{ mt: 2 }}
        >
          Adicionar contato
        </Button>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        borderRadius: 2,
        maxHeight: 430,
        overflow: 'auto'
      }}
    >
      <List disablePadding>
        {contactList.map((contact, index) => (
          <React.Fragment key={contact?.id}>
            <ListItem alignItems="flex-start" 
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(contact.id)}>
                  <Delete />
                </IconButton>
            }>
              <ListItemText
                primary={contact?.name}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {contact?.email}
                    </Typography>
                    {contact?.phone && (
                      <Typography component="div" variant="body2">
                        {contact?.phone}
                      </Typography>
                    )}
                    <Typography component="div" variant="body2" color="text.secondary" noWrap>
                      {contact?.cep}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < contactList.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ContactList;