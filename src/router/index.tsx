import { Suspense, lazy } from "react"
import { Navigate } from 'react-router-dom'
// import Home from "@/views/Home"
import Login from "@/views/login"

const HomeLayout = lazy(() => import('@/views/HomeLayout'))
const Home = lazy(() => import('@/views/Home'))

const withLoadingComponent = (comp: JSX.Element) => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            {comp}
        </Suspense>
    )
}

const router = [
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
                element: withLoadingComponent(<Home />),
            }
        ]

    },
    {
        path: '/login',
        element: <Login />,
    },
]

export default router