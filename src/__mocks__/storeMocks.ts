import { authReducer } from "@/store/auth/authSlice";
import moviesReducer from "@/store/movies/moviesSlice";

export const authed = {
  reducer: { auth: authReducer, movies: moviesReducer },
  preloadedState: {
    auth: {
      isAuthenticated: true,
      user: {
        id: "1",
        login: "JOE1",
      },
    },
    movies: {
      list: { data: [], pending: false },
      current: { data: null, pending: false },
      sort: { type: "name", asc: true },
      search: { type: "name", query: "" },
    },
  },
};
export const unauthed = {
  reducer: { auth: authReducer },
  preloadedState: { auth: { isAuthenticated: false, user: null } },
};
