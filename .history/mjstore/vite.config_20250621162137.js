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
        name: 'MJ Store App',
        short_name: 'MJS',
        description: 'A Progressive Web App built with Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-193.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-195.png',
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
