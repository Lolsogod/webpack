import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
import UnAuthed from '@/router/UnAuthed';
import {authed, unauthed} from '@/__mocks__/storeMocks';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate Component</div>,
}));

describe('UnAuthed', () => {
  let store: any;
  const renderWithState = (state: any) => {
    store = configureStore(state);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UnAuthed>
            <div>Unauthenticated content</div>
          </UnAuthed>
        </BrowserRouter>
      </Provider>
    );
  }
  test('renders children when isAuthenticated is false', () => {
    renderWithState(unauthed);
    expect(screen.getByText('Unauthenticated content')).toBeInTheDocument();
  });

  test('redirects to home when isAuthenticated is true', () => {
    renderWithState(authed);
    expect(screen.queryByText('Unauthenticated content')).not.toBeInTheDocument();
    expect(screen.getByText('Navigate Component')).toBeInTheDocument();
  });
});