import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Sort from '@/widgets/Sort';

test('renders Sort component', () => {
  render(
    <Provider store={store}>
      <Sort />
    </Provider>
  );

  // Check if the component is in the document
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