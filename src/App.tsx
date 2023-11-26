import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./styles/main.module.scss";
import MovieList from "./entities/movie/MovieList";
import MovieInfo from "./entities/movie/MovieInfo";
import { useMemo, useState } from "react";
import { movies } from "./entities/movie/data";

const App = () => {
  const [curIndex, setCurIndex] = useState<number>(-1);
  const curMovie = useMemo(() => {
    if (curIndex>=0) return movies[curIndex];
    else return null;
  }, [curIndex]);

  return (
    <div className={style.container}>
      <Header setCurIndex={setCurIndex} curMovie={curMovie}/>
      {curMovie && <MovieInfo {...curMovie} />}
      <MovieList setCurIndex={setCurIndex} />
      <Footer />
    </div>
  );
};
export default App;
