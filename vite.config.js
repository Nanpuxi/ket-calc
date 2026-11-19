import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  /* GitHub Pages 项目页挂在 /<仓库名>/ 下；本地开发不设 VITE_BASE，默认走 '/' */
  base: process.env.VITE_BASE || '/'
})
