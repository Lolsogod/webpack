import Movie from "./Movie";
import styles from "../../styles/list.module.scss";

const MovieList = (props: {
  setCurIndex: React.Dispatch<React.SetStateAction<number>>;
  moviesList: IMovieInfo[] | undefined;
  setSort: React.Dispatch<React.SetStateAction<ISort>>;
  sort: ISort;
}) => {
  const { setCurIndex, moviesList, setSort, sort } = props;

  const handleSort = (type: "name" | "year") => {
    setSort({ type, asc: sort.type != type ? true : !sort.asc });
  };
  const sortedStyle = (type: string) =>
    sort.type == type ? styles.sorted : "";

  const getDirArrow = (type: "name" | "year") =>{
    if (sort.type == type){
      if (sort.asc) return "▲"
      else return "▼"
    }
    return ""
  }
  if (moviesList) {
    return (
      <>
        <div className={styles.header}>
          <span>{moviesList.length} movies found</span>
          <div className={styles.sort}>
            <div>Sort By:</div>
            <div
              className={`${styles.sorter} ${sortedStyle("year")}`}
              onClick={() => handleSort("year")}
            >
              release date {`${getDirArrow('year')}`}
            </div>
            <div
              className={`${styles.sorter} ${sortedStyle("name")}`}
              onClick={() => handleSort("name")}
            >
              name {`${getDirArrow('name')}`}
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
