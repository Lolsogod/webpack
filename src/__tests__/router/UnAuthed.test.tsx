import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import UnAuthed from '@/router/UnAuthed';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate Component</div>,
}));

describe('UnAuthed', () => {
  test('renders children when isAuthenticated is false', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isAuthenticated: false, user: null } }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UnAuthed>
            <div>Unauthenticated content</div>
          </UnAuthed>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Unauthenticated content')).toBeInTheDocument();
  });

  test('redirects to home when isAuthenticated is true', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isAuthenticated: true, user: null } }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UnAuthed>
            <div>Unauthenticated content</div>
          </UnAuthed>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Unauthenticated content')).not.toBeInTheDocument();
    expect(screen.getByText('Navigate Component')).toBeInTheDocument();
  });
});