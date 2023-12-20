import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchMovies, fetchMovie } from '@/store/movies/moviesSlice';
import { AppDispatch, RootState } from '@/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('creates movies/fetchMovies fulfilled when fetching movies has been done', () => {
    const moviesInfo: IMovieInfo[] = [{
      id: 1,
      poster: 'test-poster',
      name: 'Test Movie',
      genere: 'Test Genere',
      year: 2022,
      lenght: '2h',
      descr: 'Test description',
    }];
    
    fetchMock.getOnce('http://localhost:5000/movies', {
      body: { movies: moviesInfo },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'movies/fetchMovies/pending' },
      { type: 'movies/fetchMovies/fulfilled', payload: { movies: moviesInfo } }
    ];
    const store = mockStore({ movies: [] });
    const dispatch: AppDispatch = store.dispatch;
    return dispatch(fetchMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates movies/fetchMovie fulfilled when fetching a movie has been done', () => {
    const movieInfo: IMovieInfo = {
      id: 1,
      poster: 'test-poster',
      name: 'Test Movie',
      genere: 'Test Genere',
      year: 2022,
      lenght: '2h',
      descr: 'Test description',
    };

    fetchMock.getOnce('http://localhost:5000/movies/1', {
      body: { movie: movieInfo },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'movies/fetchMovie/pending' },
      { type: 'movies/fetchMovie/fulfilled', payload: { movie: movieInfo } }
    ];
    const store = mockStore({ movies: [] });
    const dispatch: AppDispatch = store.dispatch;
    return dispatch(fetchMovie('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});