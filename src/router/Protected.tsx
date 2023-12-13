import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";

type Props = {
    children: JSX.Element;
};

const Protected = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation().pathname;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default Protected;