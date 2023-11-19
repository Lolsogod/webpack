import Header from "./layout/Header";
import Footer from "./layout/Footer";
import style from "./styles/main.module.scss";
import MovieList from "./entities/movie/MovieList";

const App = () => (
  <div className={style.container}>
    <Header />
    <MovieList />
    <Footer />
  </div>
);
export default App;
