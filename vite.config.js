import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-pageflip") || id.includes("pdfjs-dist")) return "flipbook"
          if (id.includes("ogl")) return "webgl"
          if (id.includes("framer-motion") || id.includes("gsap")) return "motion"
          if (id.includes("node_modules")) return "vendor"
        },
      },
    },
  },
})
