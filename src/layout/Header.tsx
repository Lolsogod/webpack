import style from "../styles/header.module.scss";
import Search from "../widgets/Search";

const Header = () => {
  return (
    <nav className={style.navBar}>
      <h1 className={style.logo}>CoolMovies</h1>
      <Search />
    </nav>
  );
};
export default Header;
