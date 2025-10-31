import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// Minimal Vite config — listens on 127.0.0.1:5173 and sets the @ alias
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all available network interfaces
    port: 3000,
    strictPort: false, // Allow fallback to next available port
    open: true, // Open browser on start
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
