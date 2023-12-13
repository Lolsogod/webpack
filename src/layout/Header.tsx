import { Link } from "react-router-dom";
import style from "../styles/header.module.scss";
import Search from "../widgets/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <nav className={style.navBar}>
      <h1 className={style.logo}>
        <Link to={"/"}>CoolMovies</Link>
      </h1>

      {!isAuthenticated ?
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
        : <>
          <Search />
          <button onClick={handleLogout}>Logout</button>
        </>}
    </nav>
  );
};
export default Header;
