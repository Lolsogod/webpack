import style from "../styles/header.module.scss";
import Search from "../widgets/Search";

const Header = (props: {
  setCurIndex: React.Dispatch<React.SetStateAction<number>>;
  curMovie: IMovieInfo | null
}) => {
  const {curMovie, setCurIndex } = props;

  return (
    <nav style={style}>
      <h1>CoolMovies</h1>
      {!curMovie && <Search />}
      {curMovie && <button className={style.searchBtn} onClick={() => setCurIndex(-1)}>Search</button>}
    </nav>
  );
};
export default Header;
