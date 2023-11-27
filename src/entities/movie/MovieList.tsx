import Movie from "./Movie";
import styles from "../../styles/list.module.scss";
import useMovies from "../../hooks/useMovies";

const MovieList = (props: {
  setCurIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { moviesList } = useMovies();
  if (moviesList) {
    return (
      <>
        <div className={styles.header}>
          <span>{moviesList.length} movies found</span>
          <div className={styles.sort}>
            <div>Sort By:</div>
            <div className={styles.sorter}>release date</div>
            <div className={styles.sorter}>name</div>
          </div>
        </div>
        <div className={styles.list}>
          {moviesList.map((info) => (
            <Movie setCurIndex={props.setCurIndex} key={info.id} info={info} />
          ))}
        </div>
      </>
    );
  }
  else{
    return (<h2>Loading ...</h2>)
  }
};
export default MovieList;
