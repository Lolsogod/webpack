import {
        createBrowserRouter
    } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";    
import Root from "../layout/Root";

    const router = createBrowserRouter([
        {
            path: "/",
            element:  <Root />,
            children: [
                {
                    path: "/",
                    element:  <MainPage />,
                },
                {
                    path: "/register",
                    element:  <RegisterPage />,
                },
                {
                    path: "/login",
                    element:  <LoginPage />,
                },
            ],
        },
        
    ]);
export default router