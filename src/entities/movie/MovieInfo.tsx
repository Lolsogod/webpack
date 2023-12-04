import { useSelector } from "react-redux";
import styles from "../../styles/movieInfo.module.scss";
import { RootState } from "../../store";

const MovieInfo = () => {
  const current = useSelector((state: RootState) => state.movies.current);
  
  if (!current) return null;
  return (
    <div className={styles.info}>
      <img className={styles.poster} src={current.poster} alt="" />
      <div className={styles.textInfo}>
        <h2 className={styles.name}>{current.name}</h2>
        <span className={styles.secondary}>Year: {current.year}</span>
        <span className={styles.secondary}>Lenght: {current.lenght}</span>
        <p className={styles.description}>{current.descr}</p>
      </div>
    </div>
  );
};
export default MovieInfo;
