import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MoviePage from '@/pages/MoviePage';
import { Store, AnyAction } from 'redux';

const mockStore = configureStore([thunk]);

describe('<MoviePage>', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      movies: {
        current: {
          pending: false,
          data: null
        }
      }
    });
  });

  test('renders Spinner component when movie is pending', () => {
    store = mockStore({
      movies: {
        current: {
          pending: true,
          data: null
        }
      }
    });

    render(
      <Provider store={store}>
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders NotFound component when movie data is null', () => {
    render(
      <Provider store={store}>
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});