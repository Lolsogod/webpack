import Movie from "./Movie";
import styles from "../../styles/list.module.scss";
import { movies } from "./data";
const MovieList = () => {
  return (
    <>
      <div className={styles.header}>
        <span>{movies.length} movies found</span>
        <div className={styles.sort}>
          <div>Sort By:</div>
          <div>release date</div>
          <div>name</div>
        </div>
      </div>
      <div className={styles.list}>
        {movies.map((info) => (
          <Movie key={info.id} {...info} />
        ))}
      </div>
    </>
  );
};
export default MovieList;
