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
  const { contactList, removeContact} = useContactContext();
  const [searchTerm, setSearchTerm] = useState<string>();
  
  const onRemove = (id: number) => removeContact(id);

  console.log('contactList', contactList)

  return(
    <>
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
        {contactList.length === 0 ? (
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
                sx={{ mt: 2 }}
                onClick={() => setOpenDialog(true)}
                >
                Adicionar contato
                </Button>
            </Paper>
        ) : (
            <Paper elevation={0} sx={{ maxHeight: 430, overflow: 'auto'}}>
                <List>
                    {contactList.map((contact, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" sx={{ my: 2 }}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(index)}>
                                <Delete />
                                </IconButton>
                        }>
                        <ListItemText primary={contact?.nome} 
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="body2" sx={{display: "flex", my: 1}}>
                                            {contact?.email}
                                        </Typography>
                                        <Typography component="span" variant="body2"  sx={{display: "flex", my: 1}}>
                                            {contact?.telefone}
                                        </Typography>
                                        <Typography component="span" variant="body2"  sx={{display: "flex", my: 1}} noWrap>
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
        )}
    </>
  )
  
};

export default ContactList;