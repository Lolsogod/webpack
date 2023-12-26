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

  test('renders first Movie components with correct information', () => {
    expect(screen.getByText(mockMovieList[0].name)).toBeInTheDocument();
  });

  test('renders second Movie components with correct information', () => {
    expect(screen.getByText(mockMovieList[1].name)).toBeInTheDocument();
  });
});