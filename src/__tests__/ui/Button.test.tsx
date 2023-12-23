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

  test('applies correct styles based on variant prop', () => {
    const { getByText, rerender } = render(<Button variant="outline">Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('btn', 'outline');

    rerender(<Button variant="ghost">Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('btn', 'ghost');

    rerender(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass('btn');
    expect(getByText('Test Button')).not.toHaveClass('outline', 'ghost');
  });
});