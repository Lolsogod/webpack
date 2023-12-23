import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Search from '@/widgets/Search';
import { commitSearch } from '@/store/movies/moviesSlice';
import { TestWrapper } from '@/__mocks__/TestWrapper';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

test('renders Search component', async () => {
  render(
    <TestWrapper store={store}>
      <Search />
    </TestWrapper>
  );

  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(inputElement).toHaveValue('test');

  const radioElement = screen.getByLabelText('Title');
  fireEvent.click(radioElement);

  const formElement = screen.getByRole('form');
  fireEvent.submit(formElement);

  console.log(formElement.outerHTML);
  expect(mockDispatch).toHaveBeenCalledWith(commitSearch({ query: 'test', type: 'name' }));
});
