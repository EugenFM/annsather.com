import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'public', // Ensure this points to your public folder
  build: {
    outDir: 'dist',
    // Make sure _redirects gets copied
  }
})
