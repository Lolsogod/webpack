import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Root from "../layout/Root";
import Protected from "./Protected";
import UnAuthed from "./UnAuthed";
import NotFound from "../pages/NotFound";
import MoviePage from "../pages/MoviePage";

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
                path: "/movie/:id",
                element: <Protected><MoviePage /></Protected>,
            },
            {
                path: "/register",
                element: <UnAuthed><RegisterPage /></UnAuthed>,
            },
            {
                path: "/login",
                element: <UnAuthed><LoginPage /></UnAuthed>,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;