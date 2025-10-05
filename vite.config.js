import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Nuclear-Physics-Simulation/',
  server: {
    port: 3000,
    open: true
  }
})
