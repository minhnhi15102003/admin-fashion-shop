import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  // ⚠️ Quan trọng cho GitHub Pages
  base: "/admin-fashion-shop/",
  
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true, // svg tự động scale
      },
    }),
  ],
})
