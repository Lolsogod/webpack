import { render, screen } from '@testing-library/react';
import Protected from '@/router/Protected';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate Component</div>,
}));
describe('Protected', () => {
  
  test('renders children when isAuthenticated is true', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isAuthenticated: true, user: null } }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Protected>
            <div>Protected content</div>
          </Protected>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  test('redirects to login when isAuthenticated is false', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isAuthenticated: false, user: null } }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Protected>
            <div>Protected content</div>
          </Protected>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Unauthenticated content')).not.toBeInTheDocument();
    expect(screen.getByText('Navigate Component')).toBeInTheDocument();
  });
});