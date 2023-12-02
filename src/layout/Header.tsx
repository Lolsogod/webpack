import style from "../styles/header.module.scss";
import Search from "../widgets/Search";

const Header = (props: {
  setCurIndex: React.Dispatch<React.SetStateAction<number>>;
  curMovie: IMovieInfo | null;
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
}) => {
  const { curMovie, setCurIndex, setSearch } = props;

  return (
    <nav className={style.navBar}>
      <h1 className={style.logo}>CoolMovies</h1>
      {!curMovie && <Search setSearch={setSearch} />}
      {curMovie && (
        <button className={style.searchBtn} onClick={() => setCurIndex(-1)}>
          Search
        </button>
      )}
    </nav>
  );
};
export default Header;
