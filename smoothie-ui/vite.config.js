import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app'], // wildcard to allow any ngrok subdomain
    strictPort: false, // optional but helps avoid port clashes
    port: 5174,        // match what you pass to ngrok
    hmr: {
      protocol: 'ws',
    },
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Pragma': 'no-cache'
    }
  }
})
