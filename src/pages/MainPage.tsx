import MovieList from "@/entities/movie/MovieList";
import Sort from "@/widgets/Sort";
import Spinner from "@/ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { fetchMovies } from "@/store/movies/moviesSlice";

const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { list, sort, search } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [sort, search]);
  return (
    <>
      <Sort />
      {list.pending && <Spinner />}
      <MovieList movies={list.data} />
    </>
  );
};

export default MainPage;
