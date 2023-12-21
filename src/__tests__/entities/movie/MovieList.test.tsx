import { render, screen } from '@testing-library/react';
import MovieList from '@/entities/movie/MovieList';
import mockMovieList from '@/__mocks__/mockMovieList';
import { MemoryRouter } from 'react-router-dom';
describe('<MovieList>', () => {

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[`/`]}>
        <MovieList movies={mockMovieList} />
      </MemoryRouter>);
  });

  test('renders correct number of Movie components', () => {
    const movieElements = screen.getAllByTestId('movie');
    expect(movieElements).toHaveLength(mockMovieList.length);
  });

  test('renders Movie components with correct information', () => {
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });
});