import Sort from '@/widgets/Sort';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { switchSort } from '@/store/movies/moviesSlice';
import { TestWrapper } from '@/__mocks__/TestWrapper';
import { authed } from '@/__mocks__/storeMocks';
import configureStore from 'redux-mock-store'

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
  let mockstore: any = configureStore();
  let store: any;
  beforeEach(() => {
    store = mockstore(authed);
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve());
    render(
      <TestWrapper store={store}>
        <Sort />
      </TestWrapper>
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

  test('renders button with release date name', () => {
    const yearButton = screen.getByRole('button', { name: /release date/i });
    expect(yearButton).toBeInTheDocument();
  });
  
  test('renders button with name', () => {
    const nameButton = screen.getByRole('button', { name: /name/i });
    expect(nameButton).toBeInTheDocument();
  });

  test('submits form on sort', () => {
    const form = screen.getByRole('form');
    const yearButton = screen.getByRole('button', { name: /release date/i });

    customFireEvent(form, 'submit', { submitter: yearButton })
    expect(store.dispatch).toHaveBeenCalledWith(switchSort('year'));
  });

});