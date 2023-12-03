import { useEffect, useState } from "react";
//import { movies } from "../entities/movie/data";

const useMovies = () => {
  const [moviesList, setMoviesList] = useState<IMovieInfo[]>();
  //разделить на два отд хука?
  const [search, setSearch] = useState<ISearch>({ query: "", type: "name" });
  const [sort, setSort] = useState<ISort>({ type: "name", asc: true });

  useEffect(() => {
    let result: any = [];
    if (search.query) {
      const reg = new RegExp(`${search.query}`, "i");
      result = result.filter((movie: any) => reg.test(movie[search.type]));
    }
    switch (sort.type) {
      case "name":
        result = result.sort((a: any, b: any) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        );
        break;
      case "year":
        result = result.sort((a: any, b: any) => a.year - b.year);
        break;
    }
    if (!sort.asc) {
      result = result.reverse();
    }
    setMoviesList(result);
  }, [sort, search]);

  return { moviesList, search, setSearch, setSort, sort };
};

export default useMovies;
