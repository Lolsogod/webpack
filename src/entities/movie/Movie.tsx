import styles from "../../styles/movie.module.scss";

const Movie = (props: {
  info: IMovieInfo;
  setCurIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { info, setCurIndex } = props;
  const selectMovie = () => setCurIndex(info.id)

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
