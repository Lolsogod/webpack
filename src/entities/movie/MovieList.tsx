import Movie from "./Movie";
import styles from "../../styles/list.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchMovies, switchSort } from "../../store/movies/moviesSlice";

const MovieList = () => {
  const dispatch: AppDispatch = useDispatch();

  //уверен можно лучше
  const moviesList = useSelector((state: RootState) => state.movies.list);
  const sort = useSelector((state: RootState) => state.movies.sort);
  const search = useSelector((state: RootState) => state.movies.search);

  const handleSort = (type: "name" | "year") => {
    dispatch(switchSort(type))
  }

  const sortByYear = () => handleSort("year");
  const sortByName = () => handleSort("name");

  const sortedStyle = (type: string) =>
    sort.type == type ? styles.sorted : "";

  const styleByYear = () => sortedStyle("year");
  const styleByName = () => sortedStyle("name");

  const getDirArrow = (type: "name" | "year") => {
    if (sort.type == type) {
      if (sort.asc) return "▲";
      else return "▼";
    }
    return "";
  };

  const arrowByYear = () => getDirArrow("year");
  const arrowByName = () => getDirArrow("name");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [sort, search]);

  if (moviesList) {
    return (
      <>
        <div className={styles.header}>
          <span>{moviesList.length} movies found</span>
          <div className={styles.sort}>
            <div>Sort By:</div>
            <div
              className={`${styles.sorter} ${styleByYear}`}
              onClick={sortByYear}
            >
              release date {`${arrowByYear()}`}
            </div>
            <div
              className={`${styles.sorter} ${styleByName}`}
              onClick={sortByName}
            >
              name {`${arrowByName()}`}
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {moviesList.map((info) => (
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
