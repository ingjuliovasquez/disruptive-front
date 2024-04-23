import { useRoutes } from 'react-router-dom'

//layouts
import Auth from '../layouts/Auth'
import AppLayout from '../layouts/AppLayout'

// Views
import NotFound from '../views/NotFound'
import Login from '../views/auth/Login'
import Signup from '../views/auth/Signup'
import Home from '../views/Home'
import CreateCategory from '../views/CreateCategory'
import CreatePost from '../views/CreatePost'

export default function Router() {
    return useRoutes([
        {
            path: "",
            children: [
                {
                    path: "",
                    element: <AppLayout />,
                    children: [
                        { path: "/", element: <Home /> },
                        { path: "/create-category", element: <CreateCategory /> },
                        { path: "/create-post", element: <CreatePost /> }
                    ]
                },
                {
                    path: "",
                    element: <Auth />,
                    children: [
                        { path: "/login", element: <Login /> },
                        { path: "signup", element: <Signup /> }
                    ]
                },
                { path: "*", element: <NotFound /> },
            ]
        }
    ])
}