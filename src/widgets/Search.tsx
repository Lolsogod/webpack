import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import style from "../styles/search.module.scss";
import { commitSearch } from "../store/movies/moviesSlice";
import Button from "../ui/Button";
import { useState } from "react";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { current } = useSelector((state: RootState) => state.movies);
  const [form, setForm] = useState({
    query: "",
    type: "name" as "name" | "genere",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(commitSearch(form));
  }
  
  return (
    <form onSubmit={handleSearch} className={style.search}>
        <input
          className={style.searchBar}
          type="text"
          placeholder="search..."
          value={form.query}
          name="query"
          onChange={handleInputChange}
        />
        <div className={style.radioGroup}>
          <div className={style.radioGroupItem}>
            <input
              className={style.hidden}
              onChange={handleInputChange}
              id="radio-1"
              type="radio"
              name="type"
              value="name"
              checked={form.type == "name"}
            />
            <label className={style.radio} htmlFor="radio-1">
              Title
            </label>
          </div>
          <div className={style.radioGroupItem}>
            <input
              className={style.hidden}
              onChange={handleInputChange}
              id="radio-2"
              type="radio"
              name="type"
              value="genere"
              checked={form.type == "genere"}
            />
            <label className={style.radio} htmlFor="radio-2">
              Genere
            </label>
          </div>
        </div>

        <Button variant="outline">
          Search
        </Button>
    </form>
  );
};
export default Search;
