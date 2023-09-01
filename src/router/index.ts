import { createBrowserRouter,redirect  } from "react-router-dom";
import { lazy } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import('../views/home')),
    loader : async () => {
      const token = localStorage.getItem('token');
        if (!token) {
          // 重定向到登录页
          console.log('重定向');
          
          return redirect("/login");
        }
      return null;
    }
  },
  {
    path: "/login",
    Component: lazy(() => import('../views/login'))
  },
]);

export default router;
