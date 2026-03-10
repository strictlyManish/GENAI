import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected";
import PublicRoute from "./features/auth/components/PublicRoute";
import Home from "./features/ai/pages/Home";
import Interview from "./features/ai/pages/Interview";
import Hero from "./pages/Hero"

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<PublicRoute><Login/></PublicRoute>
    },
    {
        path:"/home",
        element:<PublicRoute><Hero/></PublicRoute>
    },
    {
        path:"/register",
        element:<PublicRoute><Register/></PublicRoute>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview/></Protected>
    },
]);