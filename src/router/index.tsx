import { Suspense, lazy } from 'react';
import {
  Navigate,
  NavigateOptions,
  To,
  createBrowserRouter,
  redirect,
  useRouteError,
} from 'react-router-dom';
// import Home from "@/views/Home"
import Login from '@/views/login';

const HomeLayout = lazy(() => import('@/views/HomeLayout'));
const Home = lazy(() => import('@/views/Home'));

type IrouterBeforeLoad = (to: Ito, location?: Location) => Response | null;

interface Ito {
  toPath: To;
  options?: NavigateOptions;
}

// const withLoadingComponent = (comp: JSX.Element) => {
//     return (
//         <Suspense fallback={<div>Loading</div>}>
//             {comp}
//         </Suspense>
//     )
// }

const routes = [
  {
    path: '/',
    element: <Navigate to='/index'></Navigate>, // 默认进入子路由中的首页，为了让HomeLayout能够一直加载
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/index',
        // element: withLoadingComponent(<Home />),
        component: Home,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

function ErrorBoundary() {
  const error: any = useRouteError();
  return (
    <div>
      <div>{error.message}</div>
      <div>{error.stack}</div>
    </div>
  );
}

// 路由处理方式
const generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = generateRouter(item.children);
    }
    item.element = item.element || (
      <Suspense fallback={<div>加载中...</div>}>
        {/* 把懒加载的异步路由变成组件装载进去 */}
        {/* <KeepAlive id={item.name} cacheKey={item.name}> */}
        <item.component />
        {/* </KeepAlive> */}
      </Suspense>
    );
    item.errorElement = <ErrorBoundary></ErrorBoundary>;
    item.loader = async (res: any) => {
      console.log(res);
      const url = new URL(res.request.url);
      const result = beforeRouterLoader({ toPath: url.pathname });

      return result || res;
    };
    return item;
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const beforeRouterLoader: IrouterBeforeLoad = (to, from) => {
  if (to.toPath === '/login') {
    // localStorage.removeItem('ssoToken');
  } else {
    if (!localStorage.getItem('ssoToken')) {
      return redirect('/login');
    }
  }
  return null;
};

const Router = () => createBrowserRouter(generateRouter([...routes]));
export { Router };
