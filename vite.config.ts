import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePluginImp from 'vite-plugin-imp'

// console.log(import.meta.env.VITE_REACT_APP_BASEURL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    })
  ],
  resolve: {
    alias: {
      "~": path.join(__dirname, './'),
      "@": path.join(__dirname, './src'),
    }
  },
  server: {
    port: 5173,//端口号
    host:'0.0.0.0',
    proxy: {
      ["/api"]: {
        target: 'http://cmict-gateway:80',
        changeOrigin: true, //是否跨域
        rewrite: (p) =>  p.replace(/^\/api/, ""), //重写路径
      },
    },
  },
})
