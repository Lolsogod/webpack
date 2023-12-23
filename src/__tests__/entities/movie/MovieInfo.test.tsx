import { render, screen } from '@testing-library/react';
import MovieInfo from '@/entities/movie/MovieInfo';
import mockMovie from '@/__mocks__/mockMovie';

describe('<MovieInfo>', () => {
  beforeEach(() => {
    render(<MovieInfo movie={mockMovie} />);
  });

  test('renders movie information correctly', () => {
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2h 30m')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('poster')).toHaveAttribute('src', 'test-poster');
  });
});