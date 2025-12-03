import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Small Wins Board',      // <--- Ganti ini (muncul di splash screen)
        short_name: 'SWB',        // <--- Ganti ini (muncul di bawah icon HP)
        description: 'The Greatest PWA on Earth',
        theme_color: '#ffffff',
        background_color: '#F3F4F6',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png', // Anda perlu menyiapkan ikon ini di folder public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Anda perlu menyiapkan ikon ini di folder public
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})