import { render,  screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '@/layout/Header';
import { MemoryRouter } from 'react-router-dom';
import { authReducer } from '@/store/auth/authSlice';
import moviesReducer from '@/store/movies/moviesSlice';
describe('Header', () => {
  test('renders correctly for unauthenticated users', () => {
    let store = configureStore({
      reducer:{auth: authReducer},
      preloadedState: {auth: {isAuthenticated: false, user: null}}
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('CoolMovies')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders correctly for authenticated users', () => {
    const store = configureStore({
      reducer: { auth: authReducer, movies: moviesReducer },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: {
            id: '1',
            login: 'JOE1',
          },
        },
        movies: {
          list: {data: [], pending: false},
          current: {data: null, pending: false},
          sort: { type: "name", asc: true },
          search: { type: "name", query: "" },
        },
      },
    });
  
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
  
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
