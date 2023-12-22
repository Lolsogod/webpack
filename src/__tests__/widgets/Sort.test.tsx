import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Sort from '@/widgets/Sort';
import { switchSort } from '@/store/movies/moviesSlice';
import { fireEvent as rtlFireEvent } from '@testing-library/react';
import {store} from '@/store';

interface CustomEvent extends Event {
  submitter: any;
}
//@ts-ignore
function fireEvent(element, event, data) {
  const nativeEvent = new Event(event, { bubbles: true }) as CustomEvent;
  nativeEvent.submitter = data.submitter;
  rtlFireEvent(element, nativeEvent);
}
describe('<Sort>', () => {
  beforeEach(() => {
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve());
  });

  test('renders Sort component', () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const sortElement = screen.getByText(/Sort By:/i);
    expect(sortElement).toBeInTheDocument();
  });

  test('renders correct number of buttons', () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  test('renders buttons with correct names', () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const yearButton = screen.getByRole('button', { name: /release date/i });
    expect(yearButton).toBeInTheDocument();

    const nameButton = screen.getByRole('button', { name: /name/i });
    expect(nameButton).toBeInTheDocument();
  });

  test('submits form on sort', () => {
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const form = screen.getByRole('form');
    const yearButton = screen.getByRole('button', { name: /release date/i });
    fireEvent(form, 'submit', { submitter: yearButton })

    expect(store.dispatch).toHaveBeenCalledWith(switchSort('year'));
  });

});