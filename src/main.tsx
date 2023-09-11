import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';
import '@/assets/scss/global.scss';
import { Router } from '@/router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Router()} />
  </React.StrictMode>
);
