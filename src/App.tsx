import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./styles/main.module.scss";
import MovieList from "./entities/movie/MovieList";
import MovieInfo from "./entities/movie/MovieInfo";
import { useMemo, useState } from "react";
import { movies } from "./entities/movie/data";

const App = () => {
  const [curIndex, setCurIndex] = useState<number>(5);
  const curMovie = useMemo(() => {
    if (curIndex) return movies[curIndex];
    else return null;
  }, [curIndex]);

  return (
    <div className={style.container}>
      <Header />
      {curMovie && <MovieInfo {...curMovie} />}
      <MovieList />
      <Footer />
    </div>
  );
};
export default App;
