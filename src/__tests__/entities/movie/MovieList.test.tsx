import { render, screen } from '@testing-library/react';
import MovieList from '@/entities/movie/MovieList';
import mockMovieList from '@/__mocks__/mockMovieList';
import { TestWrapper } from '@/__mocks__/TestWrapper';

describe('<MovieList>', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <MovieList movies={mockMovieList} />
      </TestWrapper>
    );
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