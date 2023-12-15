import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";


type Props = {
    children: JSX.Element;
};

const UnAuthed = ({ children }: Props)=> {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return !isAuthenticated ? children : <Navigate to={"/"} replace />;
};

export default UnAuthed;