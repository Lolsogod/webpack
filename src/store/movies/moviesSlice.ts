import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
//вынести search и sort в одтельные слайсы?
interface MoviesState {
  list: IMovieInfo[];
  current: IMovieInfo | null;
  sort: ISort;
  search: ISearch;
  locSearch: ISearch;
}

const buildUrl = (sort: ISort, search: ISearch) => {
  let url = "http://localhost:5000/movies";
  url += `?_sort=${sort.type}&_order=${sort.asc ? "asc" : "desc"}`;
  url += `&${search.type}_like=${search.query}`;
  return url;
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, thunkAPI) => {
    const state = (await thunkAPI.getState()) as RootState;
    const { sort, search } = state.movies;

    return axios
      .get<IMovieInfo[]>(buildUrl(sort, search))
      .then((res) => res.data);
  }
);

const initialState: MoviesState = {
  list: [],
  current: null,
  sort: { type: "name", asc: true },
  search: { type: "name", query: "" },
  locSearch: { type: "name", query: "" },
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
  reducers: {
    setCurrent(state, action: PayloadAction<IMovieInfo | null>) {
      state.current = action.payload;
    },
    switchSort(state, action: PayloadAction<"name" | "year">) {
      const type = action.payload;
      state.sort.type = type;
      state.sort.asc = type !== state.sort.type ? true : !state.sort.asc;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.locSearch.query = action.payload;
    },
    setSearchType(state, action: PayloadAction<"name" | "genere">) {
      state.locSearch.type = action.payload;
    },
    commitSearch(state) {
      state.search = state.locSearch;
    },
  },
});
export const { setCurrent, switchSort, setSearchType, setQuery, commitSearch } =
  MoviesSlice.actions;
export default MoviesSlice.reducer;
