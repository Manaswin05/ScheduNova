import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Use a function-form manualChunks to split vendor code (Vite/Rolldown compatible)
    rolldownOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules/mermaid')) return 'vendor-mermaid'
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) return 'vendor-recharts'
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('node_modules/axios')) return 'vendor-axios'
          if (id.includes('node_modules/lucide-react')) return 'vendor-lucide'
        },
      },
    },
    // Silence chunk size warnings — we know mermaid is large by design
    chunkSizeWarningLimit: 800,
  },
})
