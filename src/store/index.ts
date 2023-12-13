import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/moviesSlice";
import persistedAuthReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: persistedAuthReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
