import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Link,
  Stack,
} from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      email,
      nome,
      password,
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            borderRadius: 2
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Cadastre-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Entrar
            </Button>
            <Stack>
                <Link component={RouterLink} to="/login" variant="subtitle2" align="center">
                    Voltar para o login
                </Link>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;