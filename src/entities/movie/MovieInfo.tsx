import { useSelector } from "react-redux";
import styles from "../../styles/movieInfo.module.scss";
import { RootState } from "../../store";

const MovieInfo = ({ movie }: { movie: IMovieInfo }) => {
  if (!movie) return null;
  return (
    <div className={styles.infoContainer}>
      <div className={styles.info}>
        <img className={styles.poster} src={movie.poster} alt="" />
        <div className={styles.textInfo}>
          <h2 className={styles.name}>{movie.name}</h2>
          <span className={styles.secondary}>
            <span className={styles.infoLabel}>Year:</span> {movie.year}
          </span>
          <span className={styles.secondary}>
            <span className={styles.infoLabel}>Lenght:</span> {movie.lenght}
          </span>
          <div className={styles.description}>
            <span className={styles.infoLabel}>Description:</span>
            <p className={styles.descriptionText}>{movie.descr}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieInfo;
