import { useEffect, useState } from "react";
import { movies } from "../entities/movie/data";

interface IlistState {
  search: {
    query: string;
    type: "name" | "genere";
  };
  sort: {
    type: "name" | "year";
    direction: "asc" | "desc";
  };
}

const useMovies = () => {
  const [moviesList, setMoviesList] = useState<IMovieInfo[]>();
  const [listState, setListState] = useState<IlistState>({
    search: { query: "", type: "name" },
    sort: { type: "name", direction: "asc" },
  });

  useEffect(() => {
    let result = [...movies];
    if (listState.search.query) {
      const reg = new RegExp(`${listState.search.query}`, "i");
      result = result.filter((movie) => reg.test(movie[listState.search.type]));
    }
    switch (listState.sort.type) {
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
    console.log(moviesList);
  }, [listState]);

  return { moviesList };
};

export default useMovies;
