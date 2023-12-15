import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Root from "../layout/Root";
import Protected from "./Protected";
import UnAuthed from "./UnAuthed";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Protected><MainPage /></Protected>,
            },
            {
                path: "/register",
                element: <UnAuthed><RegisterPage /></UnAuthed>,
            },
            {
                path: "/login",
                element: <UnAuthed><LoginPage /></UnAuthed>,
            },
        ],
    },

]);

export default router