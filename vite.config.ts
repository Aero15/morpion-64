import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: '/src/lib',
      $page: '/src/page',
      $core: '/src/core',
      $css: '/src/assets/css',
      $svg: '/src/assets/svg'
    }
  }
})
