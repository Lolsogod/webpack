import Movie from "./Movie";
import styles from "../../styles/list.module.scss";

const MovieList = (props: {
  setCurIndex: React.Dispatch<React.SetStateAction<number>>;
  moviesList: IMovieInfo[] | undefined;
  setSort: React.Dispatch<React.SetStateAction<ISort>>;
  sort: ISort;
}) => {
  const { setCurIndex, moviesList, setSort, sort } = props;
  //может вынести в отдельный компонент?
  const handleSort = (type: "name" | "year") => {
    setSort({ type, asc: sort.type != type ? true : !sort.asc });
  };

  const sortByYear = () => handleSort("year")
  const sortByName = () => handleSort("name")

  const sortedStyle = (type: string) =>
    sort.type == type ? styles.sorted : "";

  const styleByYear = () => sortedStyle("year")
  const styleByName = () => sortedStyle("name")

  const getDirArrow = (type: "name" | "year") => {
    if (sort.type == type) {
      if (sort.asc) return "▲";
      else return "▼";
    }
    return "";
  };

  const arrowByYear = () => getDirArrow("year")
  const arrowByName = () => getDirArrow("name")
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
              release date {`${arrowByYear}`}
            </div>
            <div
              className={`${styles.sorter} ${styleByName}`}
              onClick={sortByName}
            >
              name {`${arrowByName}`}
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {moviesList.map((info) => (
            <Movie setCurIndex={setCurIndex} key={info.id} info={info} />
          ))}
        </div>
      </>
    );
  } else {
    return <h2>Loading ...</h2>;
  }
};
export default MovieList;
