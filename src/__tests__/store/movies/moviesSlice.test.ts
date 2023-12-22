import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import moviesReducer, {
  fetchMovies,
  fetchMovie,
  commitSearch,
  switchSort
} from "@/store/movies/moviesSlice";

jest.mock("axios");
interface MoviesState {
  list: {data: IMovieInfo[], pending: boolean};
  current: {data: IMovieInfo | null, pending: boolean};
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

  it("should handle initial state", () => {
    const expected = {
      list: { data: [], pending: false },
      current: { data: null, pending: false },
      sort: { type: "name", asc: true },
      search: { type: "name", query: "" },
    };
    expect(store.getState().movies).toEqual(expected);
  });

  it("should handle switchSort", () => {
    store.dispatch(switchSort("year"));
    expect(store.getState().movies.sort.type).toEqual("year");
  });
  it("should handle fetchMovies.fulfilled", async () => {
    const mockMovies = [
      { id: "1", name: "Movie 1" },
      { id: "2", name: "Movie 2" },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockMovies });

    await store.dispatch(fetchMovies());

    expect(store.getState().movies.list.data).toEqual(mockMovies);
    expect(store.getState().movies.list.pending).toEqual(false);
  });

  it("should handle fetchMovie.fulfilled", async () => {
    const mockMovie = { id: "1", name: "Movie 1" };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockMovie });

    await store.dispatch(fetchMovie("1"));

    expect(store.getState().movies.current.data).toEqual(mockMovie);
    expect(store.getState().movies.current.pending).toEqual(false);
  });

  it("should handle commitSearch", () => {
    const search: ISearch = { type: "name", query: "Movie 1" };
    store.dispatch(commitSearch(search));

    expect(store.getState().movies.search).toEqual(search);
  });
  //somehow not covering brabch...
  test('sets sort.asc to true when type is different from sort.type', () => {
    const initialState: MoviesState = {
      list: {data: [], pending: false},
      current: {data: null, pending: false},
      search: {type: "name", query: ""},
      sort: {
        type: 'name',
        asc: false,
      },
    };
    const action = switchSort('name'); 
    const nextState = moviesReducer(initialState, action);
    
    expect(nextState.sort.asc).toBe(true);
  });
});
