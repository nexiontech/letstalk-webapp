import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose on all network interfaces
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          // Material-UI components
          mui: ['@mui/material', '@mui/icons-material'],
          // AWS Amplify
          aws: ['aws-amplify'],
          // FontAwesome icons
          fontawesome: [
            '@fortawesome/react-fontawesome',
            '@fortawesome/free-solid-svg-icons'
          ],
          // Redux
          redux: ['@reduxjs/toolkit', 'react-redux'],
          // Router
          router: ['react-router-dom']
        }
      }
    },
    // Increase chunk size warning limit to 600KB
    chunkSizeWarningLimit: 600,
    // Enable source maps for production debugging
    sourcemap: false,
    // Use esbuild for faster builds (default minifier)
    minify: 'esbuild'
  }
})
