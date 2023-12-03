import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface MoviesState {
  list: IMovieInfo[];
  current: IMovieInfo | null;
}

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  return axios
    .get<IMovieInfo[]>("http://localhost:5000/movies")
    .then((res) => res.data);
});

const initialState: MoviesState = {
  list: [],
  current: null,
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
    setCurrent(state, action) {
      state.current = action.payload;
    },
  },
});
export const { setCurrent } = MoviesSlice.actions;
export default MoviesSlice.reducer;
