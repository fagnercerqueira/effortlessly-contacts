import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: never }) => {
   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
   return defineConfig({
      plugins: [react()],
      server: {
         watch: {
            usePolling: true,
          },
         host: true, 
         strictPort: true,
         port: 5173,
         proxy: {
            '/api': {
               target: process.env.VITE_APP_API,
            },
         },
      },
   });
};