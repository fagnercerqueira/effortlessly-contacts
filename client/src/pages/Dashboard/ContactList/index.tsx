import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Button, 
  Paper, 
  Divider 
} from '@mui/material';
import { Delete, PersonOutline, Add } from '@mui/icons-material';
import { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  onRemove: (id: string) => void;
  onAddNew: () => void;
}

function ContactList ({ contacts, onRemove, onAddNew } : ContactListProps) {
  if (contacts.length === 0) {
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
          onClick={onAddNew}
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
        {contacts.map((contact, index) => (
          <React.Fragment key={contact?.id}>
            <ListItem alignItems="flex-start" 
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(contact?.id)}>
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
            {index < contacts.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ContactList;