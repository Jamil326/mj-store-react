import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'MJ Store ',
        short_name: 'MJ Store',
        description: 'A Progressive Web App built with Vite',
        theme_color: '#28a745',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-194.jpeg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-194.jpeg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    ],
  server:{
    host:true,
    port:5173
  }
})
