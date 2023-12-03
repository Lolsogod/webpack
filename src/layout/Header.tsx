import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import style from "../styles/header.module.scss";
import Search from "../widgets/Search";
import { setCurrent } from "../store/movies/moviesSlice";

const Header = (props: {
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
}) => {
  const { setSearch } = props;

  const dispatch: AppDispatch = useDispatch();
  const resetCurrent = () => dispatch(setCurrent(null));
  const current = useSelector((state: RootState) => state.movies.current);

  return (
    <nav className={style.navBar}>
      <h1 className={style.logo}>CoolMovies</h1>
      {!current && <Search setSearch={setSearch} />}
      {current && (
        <button className={style.searchBtn} onClick={resetCurrent}>
          Search
        </button>
      )}
    </nav>
  );
};
export default Header;
