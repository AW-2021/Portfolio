import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: {
        quality: 90,
      },
      jpeg: {
        quality: 90,
      },
      jpg: {
        quality: 90,
      },
      // WebP conversion - highly recommended for better compression
      webp: {
        quality: 90,
      },
    }),
  ],
})
