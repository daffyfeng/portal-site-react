import { Suspense, lazy } from "react"
import { Navigate, createBrowserRouter, redirect, useRouteError } from 'react-router-dom'
// import Home from "@/views/Home"
import Login from "@/views/login"

const HomeLayout = lazy(() => import('@/views/HomeLayout'))
const Home = lazy(() => import('@/views/Home'))

// const withLoadingComponent = (comp: JSX.Element) => {
//     return (
//         <Suspense fallback={<div>Loading</div>}>
//             {comp}
//         </Suspense>
//     )
// }


type IRouterBeforeLoad = (res: any, redirectUrl: string) => boolean;
let routerLoader: IRouterBeforeLoad;
const _redirectUrl: string = "/";


const routes = [
    {
        path: '/',
        element: (<Navigate to="/index"></Navigate>) // 默认进入子路由中的首页，为了让HomeLayout能够一直加载
    },
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/index',
                // element: withLoadingComponent(<Home />),
                component: Home
            }
        ]

    },
    {
        path: '/login',
        element: <Login />,
    },
]

function ErrorBoundary() {
    const error: any = useRouteError();
    return <div>
        <div>{error.message}</div>
        <div>{error.stack}</div>
    </div>;
}

// 路由处理方式
const generateRouter = (routers: any) => {
    return routers.map((item: any) => {
        if (item.children) {
            item.children = generateRouter(item.children)
        }
        item.element = item.element || <Suspense fallback={
            <div>加载中...</div>
        }>
            {/* 把懒加载的异步路由变成组件装载进去 */}
            {/* <KeepAlive id={item.name} cacheKey={item.name}> */}
            <item.component />
            {/* </KeepAlive> */}
        </Suspense>
        item.errorElement = <ErrorBoundary></ErrorBoundary>
        item.loader = async (res: any) => {
            if (routerLoader && !item.children) {
                if (routerLoader(res, _redirectUrl)) {
                    return res;
                } else {
                    return redirect(_redirectUrl);
                }
            }
            return res;
        }
        return item
    })
}

const RouterLoader = (fun: IRouterBeforeLoad) => {
    routerLoader = fun;
}

const Router = () => createBrowserRouter(generateRouter([...routes]))
export { Router, RouterLoader }