import { Link } from "react-router-dom";
import style from "@/styles/header.module.scss";
import Search from "@/widgets/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/auth/authSlice";
import Button from "@/ui/Button";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => dispatch(logout())


  return (
    <nav className={style.navBar}>
      <h1 className={style.logo}>
        <Link to={"/"}>CoolMovies</Link>
      </h1>
      {isAuthenticated &&
        <>
          <Search />
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </>}
    </nav>
  );
};
export default Header;
