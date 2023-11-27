import * as React from "react";
import { useState } from "react";
import style from "../styles/search.module.scss";
import useMovies from "../hooks/useMovies";

const Search = (props: {
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
}) => {
  const { setSearch } = props;

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
    setSearch(locSearch);
  };

  const enterCommit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitSearch();
    }
  };
  return (
    <div className={style.search}>
      <input
        type="text"
        placeholder="search..."
        value={locSearch.query}
        onChange={setQuery}
        onKeyDown={enterCommit}
      />
      <div className={style.radioGroup}>
        <div className={style.radioGroupItem}>
          <input
            onChange={setType}
            id="radio-1"
            type="radio"
            name="radio"
            value="name"
            checked={locSearch.type == "name"}
          />
          <label htmlFor="radio-1">Title</label>
        </div>
        <div className={style.radioGroupItem}>
          <input
            onChange={setType}
            id="radio-2"
            type="radio"
            name="radio"
            value="genere"
            checked={locSearch.type == "genere"}
          />
          <label htmlFor="radio-2">Genere</label>
        </div>
      </div>
      <button onClick={commitSearch}>Search</button>
    </div>
  );
};
export default Search;
