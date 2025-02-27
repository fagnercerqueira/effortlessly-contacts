import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: blue[900],
        },
    },
});

type Props = {
    children: React.ReactNode;
};



export default function ThemeProvider({ children }: Props) {


  return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </MuiThemeProvider>
  );
}
