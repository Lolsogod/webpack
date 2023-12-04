import Movie from "./Movie";
import styles from "../../styles/list.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { commitSearch, fetchMovies, switchSort } from "../../store/movies/moviesSlice";
import Sort from "../../widgets/Sort";

const MovieList = () => {
  const dispatch: AppDispatch = useDispatch();

  const { list, sort, search } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
      dispatch(fetchMovies());
  }, [sort, search]);

  if (list) {
    return (
      <>
        <Sort />
        <div className={styles.list}>
          {list.map((info) => (
            <Movie key={info.id} info={info} />
          ))}
        </div>
      </>
    );
  } else {
    return <h2>Loading ...</h2>;
  }
};
export default MovieList;
