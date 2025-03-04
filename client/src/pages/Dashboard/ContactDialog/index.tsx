import { SetStateAction, useCallback, useRef, useEffect } from 'react';
import { FormProvider, useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchema } from './schema';
import debounce from 'lodash.debounce';
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
  FormHelperText,
  OutlinedInput,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { Contact } from '../../../types/contact-type';
import { useContactContext } from '../../../hooks/use-contat-context';

type ContactDialogProps = {
  open: boolean,
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>,
}

const defaultValues = {
  id: '',
  nome: 'Fagner',
  cpf: '10373506694',
  email: 'souofagner@gmail.com',
  telefone: '32999725694',
  cep: '36889028',
  logradouro: 'Rua Tal',
  numero: '255',
  complemento: 'Ap. 201',
  bairro: 'Gávea',
  cidade: 'Muriaé',
  estado: 'MG',
};

function formatCep(cep: string): string {
  return cep
    .replace(/\D/g, '') 
    .slice(0, 8)
    .replace(/^(\d{5})(\d{1,3})$/, '$1-$2'); 
}

function formatCPF(cpf: string) {
  return cpf
  .replace(/\D/g, '')
  .slice(0, 11)
  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function ContactDialog({ open, setOpenDialog } : ContactDialogProps){

  const { addContact } = useContactContext();

  const methods = useForm<Omit<Contact, 'id' | 'latitude' | 'longitude'>>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;


  const onSubmit = useCallback(
    async (data: Omit<Contact, 'id' | 'latitude' | 'longitude'>) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      addContact(data);
      reset();
      setOpenDialog(false);
    },
    [reset]
  );

  const debouncedSearch = useRef(
    debounce(async (cep: string) => {
      await getCep(cep)
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);



  const getCep = async (cep: string) =>  {
    const searchCep = cep.replace("-", "");
    if(searchCep.length !== 8) return
    fetch(`https://viacep.com.br/ws/${searchCep}/json/`)
      .then(response => response.json())
      .then(data => {
        try{
          setValue("estado", data.estado);
          setValue("cidade", data.localidade);
          setValue("bairro", data.bairro);
          setValue("logradouro", data.logradouro);
        } catch(err){
          throw new Error(`an error occurred while trying to fill in the fields- ${err}`);
        }
      })
      .catch(err => {
        throw new Error(`an error occurred while searching for the zip code - ${err}`);
      })
  }


  return(
    <>
        {isSubmitting && (
          <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
       )}

      <FormProvider {...methods}>
          <Dialog open={open} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="nome">Nome*</InputLabel>
                          <Controller
                            name="nome"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Nome*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.nome?.message}
                          </FormHelperText>      
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="cpf">CPF*</InputLabel>
                          <Controller
                            name="cpf"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="CPF*"
                                error={!!error}
                                value={formatCPF(field.value)}
                                onChange={(e) => field.onChange(formatCPF(e.target.value))}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.cpf?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                type="email"
                                label="Email*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.email?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="telefone">Telefone</InputLabel>
                          <Controller
                            name="telefone"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Telefone*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.telefone?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="cep">CEP*</InputLabel>
                          <Controller
                            name="cep"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="CEP*"
                                error={!!error}
                                value={formatCep(field.value)}
                                onChange={(e) => {
                                  const cep = e.target.value;
                                  field.onChange(formatCep(cep));
                                  debouncedSearch(cep);
                                }}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.cep?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="logradouro">Endereço*</InputLabel>
                          <Controller
                            name="logradouro"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Endereço*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.logradouro?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="numero">Número*</InputLabel>
                          <Controller
                            name="numero"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Número*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.numero?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="complemento">Complemento*</InputLabel>
                          <Controller
                            name="complemento"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Complemento*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.complemento?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="bairro">Bairro*</InputLabel>
                          <Controller
                            name="bairro"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Bairro*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.cidade?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="cidade">Cidade*</InputLabel>
                          <Controller
                            name="cidade"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Cidade*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.cidade?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="estado">Estado*</InputLabel>
                          <Controller
                            name="estado"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <OutlinedInput
                                {...field}
                                label="Estado*"
                                error={!!error}
                                value={field.value}
                              />
                            )}
                          />
                          <FormHelperText error>
                            {errors?.complemento?.message}
                          </FormHelperText>    
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                
                <DialogActions>
                  <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                  <Button variant="contained" type="submit">Adicionar</Button>
                </DialogActions>
              </form>
            </Dialog>
        </FormProvider>
    </>
  )
}

export default ContactDialog;