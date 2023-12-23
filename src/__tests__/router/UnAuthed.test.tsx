import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import UnAuthed from '@/router/UnAuthed';
import {authed, unauthed} from '@/__mocks__/storeMocks';
import { TestWrapper } from '@/__mocks__/TestWrapper';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div>Navigate Component</div>,
}));

describe('UnAuthed', () => {
  let mockstore: any = configureStore();
  let store: any
  const renderWithState = (state: any) => {
    store = mockstore(state);
    store.dispatch = jest.fn();

    render(
      <TestWrapper store={store}>
          <UnAuthed>
            <div>Unauthenticated content</div>
          </UnAuthed>
        </TestWrapper>
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