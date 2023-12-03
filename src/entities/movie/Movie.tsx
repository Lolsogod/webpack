import { useDispatch } from "react-redux";
import styles from "../../styles/movie.module.scss";
import { AppDispatch } from "../../store";
import { setCurrent } from "../../store/movies/moviesSlice";

const Movie = (props: { info: IMovieInfo }) => {
  const { info } = props;
  const dispatch: AppDispatch = useDispatch();
  const selectMovie = () => dispatch(setCurrent(info));

  return (
    <div onDoubleClick={selectMovie} className={styles.card}>
      <img src={info.poster} className={styles.poster} alt="poster..." />
      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <h3 className={styles.movieName}>{info.name}</h3>
          <span>{info.year}</span>
        </div>
        <span className={styles.gen}>{info.genere}</span>
      </div>
    </div>
  );
};
export default Movie;
