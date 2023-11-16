import * as React from "react";
import { useState } from "react";
import style from "../styles/search.module.scss"

const Search = () => {
  const [filter, setFilter] = useState("title");

  const filterSelector = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className={style.search}>
      <input type="text" placeholder="search..." />
      <div className={style.rgroup}>
        <div className={style.rgroupitem}>
          <input
            onChange={filterSelector}
            id="radio-1"
            type="radio"
            name="radio"
            value="title"
            checked={filter == "title"}
          />
          <label htmlFor="radio-1">Title</label>
        </div>
        <div className={style.rgroupitem}>
          <input
            onChange={filterSelector}
            id="radio-2"
            type="radio"
            name="radio"
            value="genere"
            checked={filter == "genere"}
          />
          <label htmlFor="radio-2">Genere</label>
        </div>
      </div>
      <button>Search</button>
    </div>
  );
};
export default Search;
