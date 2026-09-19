import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this as a project page at
  // https://<user>.github.io/ielts-2026/ — asset URLs need the repo name
  // as a base path. Local dev (`npm run dev`) is unaffected.
  base: '/ielts-2026/',
  server: {
    port: 5173,
  },
})
