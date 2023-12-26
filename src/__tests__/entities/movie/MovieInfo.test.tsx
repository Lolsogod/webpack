import { render, screen } from '@testing-library/react';
import MovieInfo from '@/entities/movie/MovieInfo';
import mockMovie from '@/__mocks__/mockMovie';

describe('<MovieInfo>', () => {
  beforeEach(() => {
    render(<MovieInfo movie={mockMovie} />);
  });

  test('renders movie name correctly', () => {
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
  });

  test('renders movie year correctly', () => {
    expect(screen.getByText(mockMovie.year.toString())).toBeInTheDocument();
  });

  test('renders movie duration correctly', () => {
    expect(screen.getByText(mockMovie.lenght)).toBeInTheDocument();
  });

  test('renders movie description correctly', () => {
    expect(screen.getByText(mockMovie.descr)).toBeInTheDocument();
  });

  test('renders movie poster correctly', () => {
    expect(screen.getByAltText('poster')).toHaveAttribute('src', mockMovie.poster);
  });
});