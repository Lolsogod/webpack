import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { switchSort } from "../store/movies/moviesSlice";
import styles from "../styles/sort.module.scss";

const Sort = () => {
  const { list, sort } = useSelector((state: RootState) => state.movies);
  const dispatch: AppDispatch = useDispatch();

  const handleSort = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const type = (e.nativeEvent as any).submitter.name  //странновато, но работает
    dispatch(switchSort(type));
  }

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
      <span>{list.data.length} movies found</span>
      <div className={styles.sort}>
        <div>Sort By:</div>
        <form onSubmit={handleSort}>
          <button className={`${styles.sorter} ${styleByYear()}`}
            name="year">
            release date {`${arrowByYear()}`}
          </button>
          <button
            className={`${styles.sorter} ${styleByName()}`}
            name="name"
          >
            name {`${arrowByName()}`}
          </button></form>
      </div>
    </div>
  );
};
export default Sort;
