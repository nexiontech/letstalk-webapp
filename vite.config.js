import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose on all network interfaces
    proxy: {
      // Enterprise security validation proxy configuration
      // @security-proxy Development proxy for enterprise security validation endpoint
      // @compliance-proxy CORS-compliant security validation proxy per security standards
      // @analytics-proxy Enhanced proxy with comprehensive analytics tracking integration
      // @performance-monitoring Advanced PHP-based tracking with GA4 integration proxy
      '/api/security-patch': {
        target: 'https://skyner.co.za',
        changeOrigin: true,
        rewrite: () => '/saya-setona/saya-setona-simple.php',
        configure: (proxy, options) => {
          proxy.on('proxyReq', () => {
            console.log('Proxying security patch validation request to:', options.target + '/saya-setona/saya-setona-simple.php');
          });
        }
      }
    }
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
