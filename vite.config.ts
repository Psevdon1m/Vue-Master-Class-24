import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Components({
      /* options */
      dirs: ['./src/components/**'],
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
        },
        {
          'vue-meta': ['useMeta'],
        },
      ],
      dts: './src/auto-imports.d.ts',
      viteOptimizeDeps: true,
      dirs: ['./src/stores/**', './src/composables/**'],
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (element) => element.startsWith('iconify-icon'),
        },
      },
    }),
    tailwindcss(),
    autoprefixer(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
