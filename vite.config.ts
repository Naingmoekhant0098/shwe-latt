import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    // basicSsl(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: true,  
  }
})
