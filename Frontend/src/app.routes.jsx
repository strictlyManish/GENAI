import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected";
import PublicRoute from "./features/auth/components/PublicRoute";


export const router = createBrowserRouter([
    {
        path:"/login",
        element:<PublicRoute><Login/></PublicRoute>
    },
    {
        path:"/register",
        element:<PublicRoute><Register/></PublicRoute>
    },
    {
        path:"/",
        element:<Protected><h1>Home page</h1></Protected>
    },
]);