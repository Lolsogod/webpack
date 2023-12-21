import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, { switchSort } from '@/store/movies/moviesSlice';


jest.mock('axios');

describe('movies reducer', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const expected = {
      list: {data: [], pending: false},
      current: {data: null, pending: false},
      sort: { type: "name", asc: true },
      search: { type: "name", query: "" },
    };
    expect(store.getState().movies).toEqual(expected);
  });

  it('should handle switchSort', () => {
    store.dispatch(switchSort('year'));
    expect(store.getState().movies.sort.type).toEqual('year');
  });
});