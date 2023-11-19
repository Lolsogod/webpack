import style from "../styles/header.module.scss";
import Search from "../widgets/Search";

const Header = () => (
  <nav style={style}>
    <h1>CoolMovies</h1>
    <Search />
  </nav>
);
export default Header;
