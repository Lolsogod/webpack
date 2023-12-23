import { authReducer } from "@/store/auth/authSlice";
import moviesReducer from "@/store/movies/moviesSlice";

jest.mock("@/store/auth/authSlice", () => ({
  authReducer: jest
    .fn()
    .mockImplementation((state = authedState.auth) => state),
}));
jest.mock("@/store/movies/moviesSlice", () => ({
  moviesReducer: jest
    .fn()
    .mockImplementation((state = authedState.movies) => state),
}));

const authedState = {
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
};

export const authed = {
  reducer: { auth: authReducer, movies: moviesReducer },
  preloadedState: authedState,
};
