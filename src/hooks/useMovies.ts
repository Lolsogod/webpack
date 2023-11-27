import { useEffect, useState } from "react";
import { movies } from "../entities/movie/data";


const useMovies = () => {
  const [moviesList, setMoviesList] = useState<IMovieInfo[]>();
  const [search, setSearch] = useState<ISearch>({ query: "", type: "name" });
  const [sort, setSort] = useState<ISort>({ type: "name", direction: "asc" });

  useEffect(() => {
    let result = [...movies];
    if (search.query) {
      const reg = new RegExp(`${search.query}`, "i");
      result = result.filter((movie) => reg.test(movie[search.type]));
    }
    switch (sort.type) {
      case "name":
        result = result.sort((a, b) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        );
        break;
      case "year":
        result = result.sort((a, b) => a.year - b.year);
        break;
    }
    setMoviesList(result);
  }, [sort, search]);

  return { moviesList, search, setSearch };
};

export default useMovies;
