import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        'vuetify-filterable': resolve(__dirname, 'lib/vuetify-filterable.ts'),
        'composeables/useFilters': resolve(__dirname, 'lib/composeables/useFilters.ts'),
        'factories/Builder': resolve(__dirname, 'lib/factories/Builder.ts'),
      },
      name: 'vuetify-filterable',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'vuetify', '@mdi/font'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    dir: fileURLToPath(new URL('./__tests__', import.meta.url))
  }
})
