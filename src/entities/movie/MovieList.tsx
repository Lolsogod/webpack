import Movie from "./Movie";
import styles from "../../styles/list.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchMovies } from "../../store/movies/moviesSlice";

const MovieList = (props: {
  setSort: React.Dispatch<React.SetStateAction<ISort>>;
  sort: ISort;
}) => {
  const { setSort, sort } = props;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const moviesList = useSelector((state: RootState) => state.movies.list);

  const handleSort = (type: "name" | "year") => {
    setSort({ type, asc: sort.type != type ? true : !sort.asc });
  };

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
