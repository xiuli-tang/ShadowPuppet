import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// 解决__dirname在Vite中的兼容问题
const __dirname = path.resolve()

export default defineConfig({
  plugins: [
    vue(),   // 保留：处理 Vue 2.7 组件
    react()  // 保留：处理 React 19 和 JSX
  ],
  resolve: {
    alias: {
      // 保留原有：设置 @ 符号指向 src 目录（补充./为完整路径，提升稳定性）
      '@': path.resolve(__dirname, './src'),
      // 新增：兼容常见别名，避免路径解析歧义（可选但建议加）
      'assets': path.resolve(__dirname, './src/assets'),
      'views': path.resolve(__dirname, './src/views')
    },
    // 保留原有：告诉 Vite 尝试按顺序匹配这些后缀（补充.vue到靠前位置）
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    port: 3000,
    open: true, // 保留：自动打开浏览器
    // 新增：解决跨域/资源加载异常（修复500错误关键）
    cors: true,
    // 新增：禁用fs缓存，避免路径解析缓存导致的错误
    fs: {
      strict: false
    }
  },
  // 新增：构建配置，确保SVG等静态资源正确处理（修复资源导入失败）
  build: {
    assetsDir: 'assets', // 静态资源输出目录
    rollupOptions: {
      output: {
        // 避免静态资源命名冲突，防止SVG加载路径错误
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  // 新增：优化依赖，确保Vue/React依赖解析正常
  optimizeDeps: {
    include: ['vue', 'vue-router', 'react', 'react-dom']
  }
});