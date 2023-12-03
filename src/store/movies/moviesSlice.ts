import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

interface MoviesState {
  list: IMovieInfo[];
  current: IMovieInfo | null;
  sort: ISort;
  search: ISearch;
}

const buildUrl = (sort: ISort, search: ISearch) => {
  let url= 'http://localhost:5000/movies'
  url += `?${search.type}_like=${search.query}`
  url += `&_sort=${sort.type}&_order=${sort.asc ? "asc" : "desc"}`
  return url
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, thunkAPI) => {
    const state = await thunkAPI.getState() as RootState;
    const {sort, search} = state.movies

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
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.list = action.payload;
    })
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
    setSearch(state, action: PayloadAction<ISearch>) {
      state.search = action.payload;
    }
  },
});
export const { setCurrent, switchSort, setSearch } = MoviesSlice.actions;
export default MoviesSlice.reducer;
