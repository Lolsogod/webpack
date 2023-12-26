import { render, screen } from '@testing-library/react';
import Protected from '@/router/Protected';
import configureStore from 'redux-mock-store'
import { authed, unauthed } from '@/__mocks__/storeMocks';
import { TestWrapper } from '@/__mocks__/TestWrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate Component</div>,
}));
describe('Protected', () => {
  let mockstore: any = configureStore();
  let store: any;
  const renderWithState = (state: any) => {
    store = mockstore(state);
    store.dispatch = jest.fn();

    render(
      <TestWrapper store={store}>
          <Protected>
            <div>Protected content</div>
          </Protected>
        </TestWrapper>
    );
  }
  test('renders children when isAuthenticated is true', () => {
    renderWithState(authed);
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  test('redirects to login when isAuthenticated is false', () => {
    renderWithState(unauthed)
    expect(screen.getByText('Navigate Component')).toBeInTheDocument();
  });
});