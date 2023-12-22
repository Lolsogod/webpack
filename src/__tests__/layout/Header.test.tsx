import { render,  screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '@/layout/Header';
import { MemoryRouter } from 'react-router-dom';
import { authReducer } from '@/store/auth/authSlice';

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
/* TODO fix this test
  test('renders correctly for authenticated users', () => {
    let store = configureStore({
      reducer:{auth: authReducer},
      preloadedState: {auth: {isAuthenticated: true, user: {
        id: "1",
        login: "JOE1"
      }}}
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/`]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('CoolMovies')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
*/

});