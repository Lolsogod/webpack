
import styles from "../../styles/movie.module.scss";
import { useNavigate } from "react-router-dom";

const Movie = (props: { info: IMovieInfo }) => {
  const { info } = props;
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/movie/${info.id}`);
  };

  return (
    <div onDoubleClick={handleDoubleClick} className={styles.card}>
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
