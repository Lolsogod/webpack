import { render, screen } from '@testing-library/react';
import Protected from '@/router/Protected';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import { authed, unauthed } from '@/__mocks__/storeMocks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate Component</div>,
}));
describe('Protected', () => {
  let store: any;
  const renderWithState = (state: any) => {
    store = configureStore(state);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Protected>
            <div>Protected content</div>
          </Protected>
        </MemoryRouter>
      </Provider>
    );
  }
  test('renders children when isAuthenticated is true', () => {
    renderWithState(authed);
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  test('redirects to login when isAuthenticated is false', () => {
    renderWithState(unauthed)
    expect(screen.queryByText('Unauthenticated content')).not.toBeInTheDocument();
    expect(screen.getByText('Navigate Component')).toBeInTheDocument();
  });
});