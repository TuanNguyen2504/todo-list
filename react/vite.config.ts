import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }] },
  envPrefix: 'DODO_',
  server: { port: 8000, open: true }
});
