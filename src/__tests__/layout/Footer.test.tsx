import { render, screen } from '@testing-library/react';
import Footer from '@/layout/Footer'


describe('Footer', () => {
  test('renders correctly', () => {
    render(<Footer />);
    const footerElement = screen.getByText('cool site...');
    expect(footerElement).toBeInTheDocument();
  });
});