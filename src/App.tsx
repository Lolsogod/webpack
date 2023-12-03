import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./styles/main.module.scss";
import MovieList from "./entities/movie/MovieList";
import MovieInfo from "./entities/movie/MovieInfo";
import useMovies from "./hooks/useMovies";

const App = () => {
  const { setSearch, setSort, sort } = useMovies();
  return (
    <div className={style.container}>
      <Header setSearch={setSearch} />
      <MovieInfo />
      <MovieList setSort={setSort} sort={sort} />
      <Footer />
    </div>
  );
};
export default App;
