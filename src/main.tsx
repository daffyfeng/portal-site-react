import React from 'react'
import ReactDOM from 'react-dom/client'
import "reset-css"
import "@/assets/scss/global.scss"
import { Router } from '@/router'
import { RouterProvider } from 'react-router-dom'
import { RouterBeforeEach } from "@/utils/useUtilsNavigate";
RouterBeforeEach((to, from) => {
  console.log("路由守卫to", to)
  console.log("路由守卫from", from)
  return true;
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Router()} />
  </React.StrictMode>,
)
