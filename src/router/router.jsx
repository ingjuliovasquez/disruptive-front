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
import Post from '../views/Post'

export default function Router() {
    return useRoutes([
        {
            path: "",
            element: <AppLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/home", element: <Home /> },
                { path: "/create-category", element: <CreateCategory /> },
                { path: "/create-post", element: <CreatePost /> },
                { path: "/update-post/:id", element: <CreatePost /> },
                { path: "/post/:id", element: <Post /> }
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
    ])
}