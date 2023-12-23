import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Sort from '@/widgets/Sort';
import { switchSort } from '@/store/movies/moviesSlice';
import { fireEvent } from '@testing-library/react';
import { store } from '@/store';

interface CustomEvent extends Event {
  submitter: any;
}
//костылёк
function customFireEvent(element: Node | Window, event: string, data: { submitter: any; }) {
  const nativeEvent = new Event(event, { bubbles: true }) as CustomEvent;
  nativeEvent.submitter = data.submitter;
  fireEvent(element, nativeEvent);
}
describe('Sort', () => {
  beforeEach(() => {
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve());
    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );
  });

  test('renders Sort component', () => {
    const sortElement = screen.getByText(/Sort By:/i);
    expect(sortElement).toBeInTheDocument();
  });

  test('renders correct number of buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  test('renders buttons with correct names', () => {
    const yearButton = screen.getByRole('button', { name: /release date/i });
    const nameButton = screen.getByRole('button', { name: /name/i });

    expect(yearButton).toBeInTheDocument();
    expect(nameButton).toBeInTheDocument();
  });

  test('submits form on sort', () => {
    const form = screen.getByRole('form');
    const yearButton = screen.getByRole('button', { name: /release date/i });

    customFireEvent(form, 'submit', { submitter: yearButton })
    expect(store.dispatch).toHaveBeenCalledWith(switchSort('year'));
  });

});