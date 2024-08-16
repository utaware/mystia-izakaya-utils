import { resolve } from 'path'
import { defineConfig } from 'vite'

function pathResolve(url) {
  return resolve(__dirname, url)
}

export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  build: {
    lib: {
      entry: './src/lib/index.ts',
      name: 'main',
      fileName: 'main',
    },
  },
})
