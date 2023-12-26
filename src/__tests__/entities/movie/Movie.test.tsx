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

  test('renders movie title with correct information', () => {
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
  });

  test('renders movie year with correct information', () => {
    expect(screen.getByText(mockMovie.year)).toBeInTheDocument();
  });

  test('renders movie genere with correct information', () => {
    expect(screen.getByText(mockMovie.genere)).toBeInTheDocument();
  });

  test('renders movie poster with correct information', () => {
    expect(screen.getByAltText('poster...')).toHaveAttribute('src', 'test-poster');
  });
  
  test('navigates to correct movie page on click', () => {
    fireEvent.click(screen.getByTestId('movie'));
    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});

