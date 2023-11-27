import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./styles/main.module.scss";
import MovieList from "./entities/movie/MovieList";
import MovieInfo from "./entities/movie/MovieInfo";
import { useMemo, useState } from "react";
import { movies } from "./entities/movie/data";
import useMovies from "./hooks/useMovies";

const App = () => {
  const { moviesList, setSearch, setSort, sort } = useMovies();
  const [curIndex, setCurIndex] = useState<number>(-1);

  const curMovie = useMemo(() => {
    if (curIndex >= 0) return movies[curIndex];
    else return null;
  }, [curIndex]);

  return (
    <div className={style.container}>
      <Header
        setCurIndex={setCurIndex}
        curMovie={curMovie}
        setSearch={setSearch}
      />
      {curMovie && <MovieInfo {...curMovie} />}
      <MovieList
        setCurIndex={setCurIndex}
        moviesList={moviesList}
        setSort={setSort}
        sort={sort}
      />
      <Footer />
    </div>
  );
};
export default App;
