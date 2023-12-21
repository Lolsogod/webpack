import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/NotFound';

describe('<NotFound>', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('renders 404 - Page Not Found title', () => {
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  test('renders The page you are looking for does not exist message', () => {
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });
});