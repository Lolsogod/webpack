import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/moviesSlice";
import persistedAuthReducer, { register } from "./auth/authSlice";
import { persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false //неуверен...
  }),
});

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
