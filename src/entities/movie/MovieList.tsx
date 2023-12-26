import Movie from "./Movie";
import styles from "@/styles/list.module.scss";
const MovieList = ({movies}: {movies: IMovieInfo[]}) => {
  
  return (
      <div className={styles.list} data-testid="movie-list">
        {movies.map((info) => (
          <Movie key={info.id} info={info} />
        ))}
      </div>
  );
  } 
export default MovieList;
