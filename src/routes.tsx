import { useRoutes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Posts from "./pages/Posts"

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "/posts",
                    element: <Posts />
                }
            ]
        }
    ])
}
