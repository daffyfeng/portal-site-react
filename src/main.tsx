import React from 'react'
import ReactDOM from 'react-dom/client'
import "reset-css"
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "@/assets/scss/global.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
