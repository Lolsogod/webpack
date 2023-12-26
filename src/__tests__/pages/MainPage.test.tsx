import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MainPage from '@/pages/MainPage';
import { TestWrapper } from '@/__mocks__/TestWrapper';
import { authed } from '@/__mocks__/storeMocks';

const mockStore = configureStore([thunk]);

describe('<MainPage>', () => {
  let store;
  beforeEach(() => {
    store = mockStore(authed);
    render(
      <TestWrapper store={store}>
        <MainPage />
      </TestWrapper>
    );
  });

  test('renders Sort component', () => {
    expect(screen.getByText(/sort/i)).toBeInTheDocument();
  });

  test('renders MovieList component', () => {
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
  });
});