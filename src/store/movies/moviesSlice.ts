import { createSlice } from "@reduxjs/toolkit";
import { movies } from "../../entities/movie/data";

interface MoviesState {
    list: IMovieInfo[];
}

const initialState: MoviesState = {
    list: movies,
}

const MoviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
       /* getMovies(state, action) {
            state.list = action.payload
        }*/
    }
})
//export const { getMovies } = MoviesSlice.actions
export default  MoviesSlice.reducer