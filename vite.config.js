import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Keeps the existing Java Servlet API available during local React development.
      '/ExpenseFlow': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  base: './'
})