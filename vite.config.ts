import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: './', // VERY IMPORTANT for Electron
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
