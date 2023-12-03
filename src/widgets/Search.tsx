import * as React from "react";
import { useState } from "react";
import style from "../styles/search.module.scss";
import { setSearch } from "../store/movies/moviesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [locSearch, setLocSearch] = useState<ISearch>({
    query: "",
    type: "name",
  });

  const setQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocSearch({ ...locSearch, query: e.target.value });
  };
  const setType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocSearch({ ...locSearch, type: e.target.value as "name" | "genere" });
  };

  const commitSearch = () => {
    dispatch(setSearch(locSearch));
  };

  const enterCommit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitSearch();
    }
  };
  return (
    <div className={style.search}>
      <input
        className={style.searchBar}
        type="text"
        placeholder="search..."
        value={locSearch.query}
        onChange={setQuery}
        onKeyDown={enterCommit}
      />
      <div className={style.radioGroup}>
        <div className={style.radioGroupItem}>
          <input
            className={style.hidden}
            onChange={setType}
            id="radio-1"
            type="radio"
            name="radio"
            value="name"
            checked={locSearch.type == "name"}
          />
          <label className={style.radio} htmlFor="radio-1">
            Title
          </label>
        </div>
        <div className={style.radioGroupItem}>
          <input
            className={style.hidden}
            onChange={setType}
            id="radio-2"
            type="radio"
            name="radio"
            value="genere"
            checked={locSearch.type == "genere"}
          />
          <label className={style.radio} htmlFor="radio-2">
            Genere
          </label>
        </div>
      </div>
      <button className={style.searchBtn} onClick={commitSearch}>
        Search
      </button>
    </div>
  );
};
export default Search;
