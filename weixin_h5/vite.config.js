/*
 * @Author: Niezihao 1332421989@qq.com
 * @Date: 2024-03-10 00:26:03
 * @LastEditors: niezihao
 * @LastEditTime: 2024-03-25 10:28:16
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { //主要是加上这段代码
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '/api/ms-sanfu-spi-customer': {
        target: 'https://tm.sanfu.com',	//实际请求地址
        // target: 'http://192.168.110.29:3000',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/api': {
        target: 'http://8.138.131.112:3000',	//实际请求地址
        // target: 'http://192.168.110.29:3000',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/': {
      //   target: 'http://8.138.131.112:3000',	//实际请求地址
      //   // target: 'http://192.168.110.29:3000',	//实际请求地址
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\//, '')
      // },
    
    }
  }
})
