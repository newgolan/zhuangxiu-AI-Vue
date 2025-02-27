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
  publicPath: process.env.NODE_ENV === "production" ? "/zhuangxiu-AI-Vue/" : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: '/zhuangxiu-AI-Vue/',  // 生产环境路径
  build: {
    outDir: 'dist',         // 构建输出目录
    assetsDir: 'assets',    // 静态资源子目录
    emptyOutDir: true       // 构建前清空目录（推荐
  }
})
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/zhuangxiu-AI-Vue/'  // 仓库名称（若部署到子路径）
//     : '/'
// }