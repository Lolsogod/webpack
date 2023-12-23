import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import Header from '@/layout/Header';
import { logout } from '@/store/auth/authSlice';
import { unauthed, authed } from '@/__mocks__/storeMocks';
import { TestWrapper } from '@/__mocks__/TestWrapper';

describe('Header', () => {
  jest.mock('@/store/auth/authSlice', () => ({
    logout: jest.fn(),
  }));
  
  let mockstore: any = configureStore();
  let store: any;
  const renderWithState = (state: any) => {
    store = mockstore(state);
    store.dispatch = jest.fn();
    render(
      <TestWrapper store={store}>
          <Header />
      </TestWrapper>
    );
  }

  test('renders correctly for unauthenticated users', () => {
    renderWithState(unauthed);
    
    expect(screen.getByText('CoolMovies')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders correctly for authenticated users', () => {
    renderWithState(authed);
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('dispatches logout action when logout button is clicked', () => {
    renderWithState(authed);
    fireEvent.click(screen.getByText('Logout'));
    console.log(store);
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });
})
