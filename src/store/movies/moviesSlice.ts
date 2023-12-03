import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface MoviesState {
  list: IMovieInfo[];
}

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  return axios
    .get<IMovieInfo[]>("http://localhost:5000/movies")
    .then((res) => res.data);
});

const initialState: MoviesState = {
  list: [],
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
  reducers: {},
});
//export const {  } = MoviesSlice.actions
export default MoviesSlice.reducer;
