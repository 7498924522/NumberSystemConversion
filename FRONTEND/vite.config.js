import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/',        // ensures correct paths in production
  build: {
    outDir: 'dist'   // matches Vercel outputDirectory
  }
});
