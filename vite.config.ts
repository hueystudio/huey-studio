import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // ⭐重点！用户名.github.io仓库固定写 "/", 如果不是 用户名.github.io 仓库，必须设置 base: "/仓库名/"
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
