import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src')
//     }
//   },
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })
export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/zhuangxiu-AI-Vue/'  // 仓库名称（若部署到子路径）
    : '/',
    plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  build: {
    outDir: 'dist',        // 必须与 gh-pages 的 -d 参数一致
    emptyOutDir: true      // 构建前清空输出目录
  }
})
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/zhuangxiu-AI-Vue/'  // 仓库名称（若部署到子路径）
//     : '/'
// }