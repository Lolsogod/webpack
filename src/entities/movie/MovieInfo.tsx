import { useSelector } from "react-redux";
import styles from "../../styles/movieInfo.module.scss";
import { RootState } from "../../store";

const MovieInfo = ({movie}:{movie: IMovieInfo}) => {
  if (!movie) return null;
  return (
    <div className={styles.info}>
      <img className={styles.poster} src={movie.poster} alt="" />
      <div className={styles.textInfo}>
        <h2 className={styles.name}>{movie.name}</h2>
        <span className={styles.secondary}>Year: {movie.year}</span>
        <span className={styles.secondary}>Lenght: {movie.lenght}</span>
        <p className={styles.description}>{movie.descr}</p>
      </div>
    </div>
  );
};
export default MovieInfo;
