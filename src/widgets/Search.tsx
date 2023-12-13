import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import style from "../styles/search.module.scss";
import {
  setCurrent,
  setQuery,
  setSearchType,
  commitSearch,
} from "../store/movies/moviesSlice";
import Button from "../ui/Button";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { current, searchParams} = useSelector(
    (state: RootState) => state.movies
  );

  const resetCurrent = () => dispatch(setCurrent(null));

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setQuery(e.target.value));

  const handleCommit = () => dispatch(commitSearch());

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchType(e.target.value as "name" | "genere"));

  const enterCommit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommit();
  };

  if (current)
    return (
      <Button onClick={resetCurrent}>
        Search
      </Button>
    );
  return (
    <div className={style.search}>
      <input
        className={style.searchBar}
        type="text"
        placeholder="search..."
        value={searchParams.query}
        onChange={handleQuery}
        onKeyDown={enterCommit}
      />
      <div className={style.radioGroup}>
        <div className={style.radioGroupItem}>
          <input
            className={style.hidden}
            onChange={handleType}
            id="radio-1"
            type="radio"
            name="radio"
            value="name"
            checked={searchParams.type == "name"}
          />
          <label className={style.radio} htmlFor="radio-1">
            Title
          </label>
        </div>
        <div className={style.radioGroupItem}>
          <input
            className={style.hidden}
            onChange={handleType}
            id="radio-2"
            type="radio"
            name="radio"
            value="genere"
            checked={searchParams.type == "genere"}
          />
          <label className={style.radio} htmlFor="radio-2">
            Genere
          </label>
        </div>
      </div>
      <Button variant="outline" onClick={handleCommit}>
        Search
      </Button>
    </div>
  );
};
export default Search;
