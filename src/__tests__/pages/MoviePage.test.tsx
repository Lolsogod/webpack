import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MoviePage from '@/pages/MoviePage';

const mockStore = configureStore([thunk]);

describe('<MoviePage>', () => {
  const renderWithState = (state: any) => {
    let store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/1']}>
          <Routes>
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  test('renders Spinner component when movie is pending', () => {
    renderWithState({
      movies: {
        current: {
          pending: true,
          data: null
        }
      }
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders NotFound component when movie data is null', () => {
    renderWithState({
      movies: {
        current: {
          pending: false,
          data: null
        }
      }
    });

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});