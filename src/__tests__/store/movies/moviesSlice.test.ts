import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import moviesReducer, {
  fetchMovies,
  fetchMovie,
  commitSearch,
  switchSort,
} from "@/store/movies/moviesSlice";
import mockMovieList from "@/__mocks__/mockMovieList";
import mockMovie from "@/__mocks__/mockMovie";

jest.mock("axios");
interface MoviesState {
  list: { data: IMovieInfo[]; pending: boolean };
  current: { data: IMovieInfo | null; pending: boolean };
  sort: ISort;
  search: ISearch;
}
describe("movies reducer", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
  });

  test("should handle initial state", () => {
    const expected = {
      list: { data: [], pending: false },
      current: { data: null, pending: false },
      sort: { type: "name", asc: true },
      search: { type: "name", query: "" },
    };
    expect(store.getState().movies).toEqual(expected);
  });

  test("should handle switchSort", () => {
    console.log(store.getState().movies.sort);
    store.dispatch(switchSort("year"));
    expect(store.getState().movies.sort.type).toEqual("year");
    console.log(store.getState().movies.sort);
  });

  test("should handle fetchMovies.fulfilled", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockMovieList });

    await store.dispatch(fetchMovies());

    expect(store.getState().movies.list.data).toEqual(mockMovieList);
    expect(store.getState().movies.list.pending).toEqual(false);
  });

  test("should handle fetchMovie.fulfilled", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockMovie });

    await store.dispatch(fetchMovie("1"));

    expect(store.getState().movies.current.data).toEqual(mockMovie);
    expect(store.getState().movies.current.pending).toEqual(false);
  });

  test("should handle commitSearch", () => {
    const search: ISearch = { type: "name", query: "Movie 1" };
    store.dispatch(commitSearch(search));

    expect(store.getState().movies.search).toEqual(search);
  });

  test("sets sort.asc to true when type is different from sort.type", () => {
    const initialState: MoviesState = {
      list: { data: [], pending: false },
      current: { data: null, pending: false },
      search: { type: "name", query: "" },
      sort: {
        type: "name",
        asc: true,
      },
    };
    const action = switchSort("year");
    const nextState = moviesReducer(initialState, action);

    expect(nextState.sort.asc).toBe(true);
  });
  test("sets sort.asc switch when type is same as sort.type", () => {
    const initialState: MoviesState = {
      list: { data: [], pending: false },
      current: { data: null, pending: false },
      search: { type: "name", query: "" },
      sort: {
        type: "name",
        asc: true,
      },
    };
    const action = switchSort("name");
    const nextState = moviesReducer(initialState, action);

    expect(nextState.sort.asc).toBe(false);
  });
});
