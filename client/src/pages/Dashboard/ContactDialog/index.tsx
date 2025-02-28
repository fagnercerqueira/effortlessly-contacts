import { SetStateAction, useCallback } from 'react';
import { FormProvider, useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchema } from './schema';
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
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { Contact } from '../../../types/contact-type';

type ContactDialogProps = {
  open: boolean,
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>,
}

export const defaultValues = {
  id: '',
  name: '',
  cpf: '',
  email: '',
  phone: '',
  cep: 0,
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  latitude: 0,
  longitude: 0,
};

function ContactDialog({ open, setOpenDialog } : ContactDialogProps){

    const methods = useForm<Contact>({
        resolver: yupResolver(FormSchema),
        defaultValues,
      });

    const {
      watch,
      reset,
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = methods;

    const onSubmit = useCallback(
      async (data: Contact) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.info('DATA', data);
        reset();
      },
      [reset]
    );

    const values = watch();

    console.log('[values]', values)

    return(
      <>
        {isSubmitting && (
          <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}


      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog open={open} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle>
                Adicionar Novo Contato
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenDialog(false)}
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
                          label="Nome*"
                          {...register("name")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                          id="email"
                          label="Email"
                          {...register("email")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="phone">Telefone</InputLabel>
                        <OutlinedInput
                          id="phone"
                          label="Telefone"
                          {...register("phone")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="cep">Endereço*</InputLabel>
                        <OutlinedInput
                          id="cep"
                          label="Endereço*"
                          rows={2}
                          {...register("cep")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="latitude">Latitude</InputLabel>
                        <OutlinedInput
                          id="latitude"
                          type="number"
                          label="Latitude"
                          {...register("latitude")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="longitude">Longitude</InputLabel>
                        <OutlinedInput
                          id="longitude"
                          type="number"
                          label="Longitude"
                          {...register("longitude")}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                <Button variant="contained" type="submit">Adicionar</Button>
              </DialogActions>
            </Dialog>
          </form>
      </FormProvider>
      </>
    )
}

export default ContactDialog;