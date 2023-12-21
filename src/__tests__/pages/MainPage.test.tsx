import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MainPage from '@/pages/MainPage';

const mockStore = configureStore([thunk]);

describe('<MainPage>', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: {
        list: {
          pending: false,
          data: []
        },
        sort: 'asc',
        search: ''
      }
    });

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  });

  test('renders Sort component', () => {
    expect(screen.getByText(/sort/i)).toBeInTheDocument();
  });

  test('renders MovieList component', () => {
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
  });
});