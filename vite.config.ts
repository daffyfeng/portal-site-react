import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.join(__dirname, 'src'),
  plugins: [react()],
  server:{
    host:'0.0.0.0'
  }
})
