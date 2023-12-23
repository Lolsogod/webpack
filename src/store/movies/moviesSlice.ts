import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store"
interface MoviesState {
  list: {data: IMovieInfo[], pending: boolean};
  current: {data: IMovieInfo | null, pending: boolean};
  sort: ISort;
  search: ISearch;
}

const buildUrl = (sort: ISort, search: ISearch) => {
  let url = "http://localhost:5000/movies";
  url += `?_sort=${sort.type}&_order=${sort.asc ? "asc" : "desc"}`;
  url += `&${search.type}_like=${search.query}`;
  return url;
};

export const fetchMovie = createAsyncThunk(
  "movies/fetchMovie",
  async (id: string) => {
    return axios
      .get<IMovieInfo>(`http://localhost:5000/movies/${id}`)
      .then((res) => res.data);
  }
);
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
  list: {data: [], pending: false},
  current: {data: null, pending: false},
  sort: { type: "name", asc: true },
  search: { type: "name", query: "" },
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.list = {data: action.payload, pending: false};
    });
    builder.addCase(fetchMovies.pending, (state) => {
      state.list = {data: state.list.data, pending: true};
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.current = {data: action.payload, pending: false};
    });
    builder.addCase(fetchMovie.pending, (state) => {
      state.current = {data: null, pending: true};
    });
    builder.addCase(fetchMovie.rejected, (state) => {
      state.current = {data: null, pending: false};
    });
  },
  reducers: {
    switchSort(state, action: PayloadAction<"name" | "year">) {
      const type = action.payload;
      state.sort.asc = type != state.sort.type ? true : !state.sort.asc;
      state.sort.type = type;
    },
    commitSearch(state, action: PayloadAction<ISearch>) {
      state.search = action.payload;
    },
  },
});
export const { switchSort, commitSearch } =
  MoviesSlice.actions;
export default MoviesSlice.reducer;
