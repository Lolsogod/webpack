import { render, fireEvent } from '@testing-library/react';
import Button from '@/ui/Button';

describe('Button', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Test Button</Button>);

    fireEvent.click(getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies outline styles when variant is outline', () => {
    const { getByText } = render(<Button variant="outline">Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('btn', 'outline');
  });
  
  test('applies ghost styles when variant is ghost', () => {
    const { getByText } = render(<Button variant="ghost">Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('btn', 'ghost');
  });
  
  test('applies default styles when no variant is provided', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('btn');
  });
  
  test('does not apply outline or ghost styles when no variant is provided', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).not.toHaveClass('outline', 'ghost');
  });
});