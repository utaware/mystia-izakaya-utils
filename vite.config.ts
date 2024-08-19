import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

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
  plugins: [
    dts({ rollupTypes: true }),
    visualizer({ filename: './script/stats.html' }),
  ],
})
