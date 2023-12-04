import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { switchSort } from "../store/movies/moviesSlice";
import styles from "../styles/sort.module.scss";

const Sort = () => {
  const { list, sort } = useSelector((state: RootState) => state.movies);
  const dispatch: AppDispatch = useDispatch();

  //вынести сортировку в хук?
  const handleSort = (type: "name" | "year") => dispatch(switchSort(type));

  const sortByYear = () => handleSort("year");
  const sortByName = () => handleSort("name");

  const sortedStyle = (type: string) =>
    sort.type == type ? styles.sorted : "";

  const styleByYear = () => sortedStyle("year");
  const styleByName = () => sortedStyle("name");

  const getDirArrow = (type: "name" | "year") => {
    if (sort.type == type) {
      if (sort.asc) return "▲";
      return "▼";
    }
    return "";
  };
  const arrowByYear = () => getDirArrow("year");
  const arrowByName = () => getDirArrow("name");

  return (
    <div className={styles.header}>
      <span>{list.length} movies found</span>
      <div className={styles.sort}>
        <div>Sort By:</div>
        <div className={`${styles.sorter} ${styleByYear}`} onClick={sortByYear}>
          release date {`${arrowByYear()}`}
        </div>
        <div className={`${styles.sorter} ${styleByName}`} onClick={sortByName}>
          name {`${arrowByName()}`}
        </div>
      </div>
    </div>
  );
};
export default Sort;
