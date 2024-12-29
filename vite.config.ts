import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,eot,ttf,woff}']
      },
      //includeAssets: ['apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Morpion 64',
        short_name: 'Morpion 64',
        description: "Tic tac toe game with a 64 grid",
        theme_color: '#5e0080',
        orientation: 'portrait-primary',
        lang: 'fr-FR',
        icons: [
          {
            src: "/pwa/icon-128.png",
            sizes: "128x128",
            type: "image/png"
          }, 
          {
            src: "/pwa/icon-144.png",
            sizes: "144x144",
            type: "image/png"
          }, 
          {
            src: "/pwa/icon-152.png",
            sizes: "152x152",
            type: "image/png"
          }, 
          {
            src: "/pwa/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          }, 
          {
            src: "/pwa/icon-256.png",
            sizes: "256x256",
            type: "image/png"
          }, 
          {
            src: "/pwa/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        "categories": [
          "productivity",
          "utilities"
        ],
      }
    })
  ],
  resolve: {
    alias: {
      $lib: '/src/lib',
      $page: '/src/page',
      $core: '/src/core',
      $css: '/src/assets/css',
      $png: '/src/assets/png',
      $svg: '/src/assets/svg'
    }
  }
})
