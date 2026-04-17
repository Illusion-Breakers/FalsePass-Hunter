import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  server: {
    port: 5173,
    strictPort: false,
    host: true
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets'
  }
})
