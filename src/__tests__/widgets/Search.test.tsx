import { fireEvent, render, screen } from '@testing-library/react';
import Search from '@/widgets/Search';
import { commitSearch } from '@/store/movies/moviesSlice';
import { TestWrapper } from '@/__mocks__/TestWrapper';
import configureStore from 'redux-mock-store'
import { authed } from '@/__mocks__/storeMocks';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Search', () => {
  let mockstore: any;
  let store: any;

  beforeEach(() => {
    mockstore = configureStore();
    store = mockstore(authed);
    render(
      <TestWrapper store={store}>
        <Search />
      </TestWrapper>
    );
  });

  test('renders Search component', async () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates input value on change', async () => {
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement).toHaveValue('test');
  });

  test('clicks on radio button', async () => {
    const radioElement = screen.getByLabelText('Title');
    fireEvent.click(radioElement);
    expect(radioElement).toBeChecked();
  });
  
  test('submits form', async () => {
    const formElement = screen.getByRole('form');
    fireEvent.submit(formElement);
    expect(mockDispatch).toHaveBeenCalled(); 
  });

  test('dispatches commitSearch action on form submit', async () => {
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const radioElement = screen.getByLabelText('Title');
    fireEvent.click(radioElement);

    const formElement = screen.getByRole('form');
    fireEvent.submit(formElement);

    expect(mockDispatch).toHaveBeenCalledWith(commitSearch({ query: 'test', type: 'name' }));
  });
});
