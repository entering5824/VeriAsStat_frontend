import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  define: {
    'process.env.DEBUG': false,
  },
  // Remove console.log and debugger in production
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild', // esbuild is faster than terser
    rollupOptions: {
      output: {
        // Add hash to filenames to prevent caching issues
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
        // Code splitting strategy
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'vuetify-vendor': ['vuetify']
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vuetify'],
  },
  server: {
    port: 5174,
    strictPort: true,
    // Force reload CSS and prevent caching issues
    hmr: {
      overlay: true
    },
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    // Vite 5+/7 warmup to pre-transform frequently used files
    warmup: {
      clientFiles: [
        './index.html',
        './src/main.ts',
        './src/**/*.{ts,vue}',
      ],
    },
  },
  css: {
    // Enable CSS sourcemaps in development for better debugging
    devSourcemap: true
  },
})
