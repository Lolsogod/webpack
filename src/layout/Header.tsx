import { Link } from "react-router-dom";
import style from "../styles/header.module.scss";
import Search from "../widgets/Search";

const Header = () => {
  return (
    <nav className={style.navBar}>
      <h1 className={style.logo}>CoolMovies</h1>
      <Search />
      <Link to="/login">Login</Link>
    </nav>
  );
};
export default Header;
