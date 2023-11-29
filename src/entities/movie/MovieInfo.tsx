import styles from "../../styles/movieInfo.module.scss";

const MovieInfo = (props: {info: IMovieInfo}) => {
  const {info} = props
  return (
    <div className={styles.info}>
      <img className={styles.poster} src={info.poster} alt="" />
      <div className={styles.textInfo}>
        <h2 className={styles.name}>{info.name}</h2>
        <span className={styles.secondary}>Year: {info.year}</span>
        <span className={styles.secondary}>Lenght: {info.lenght}</span>
        <p className={styles.description}>{info.descr}</p>
      </div>
    </div>
  );
};
export default MovieInfo;
