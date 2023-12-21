import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Search from '@/widgets/Search';

test('renders Search component', async () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});
