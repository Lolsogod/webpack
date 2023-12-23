import { fireEvent, render, screen } from '@testing-library/react';
import Movie from '@/entities/movie/Movie';
import mockMovie from '@/__mocks__/mockMovie';
import { TestWrapper } from '@/__mocks__/TestWrapper';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Movie', () => {
  beforeEach(() => {
    mockNavigate = jest.fn();
    render(
      <TestWrapper>
        <Movie info={mockMovie} />
      </TestWrapper>
    );
  });

  test('renders movie card with correct information', () => {
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.year)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genere)).toBeInTheDocument();
    expect(screen.getByAltText('poster...')).toHaveAttribute('src', 'test-poster');
  });

  test('navigates to correct movie page on click', () => {
    fireEvent.click(screen.getByTestId('movie'));
    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});

