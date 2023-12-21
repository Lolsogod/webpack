import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Movie from '@/entities/movie/Movie';
import mockMovie from '@/__mocks__/mockMovie';

let mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Movie', () => {
  beforeEach(() => {
    mockNavigate = jest.fn();

    render(
      <MemoryRouter initialEntries={[`/`]}>
        <Movie info={mockMovie} />
      </MemoryRouter>
    );
  });
  test('renders movie card with correct information', () => {
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Test Genere')).toBeInTheDocument();
    expect(screen.getByAltText('poster...')).toHaveAttribute('src', 'test-poster');
  });

  test('navigates to correct movie page on click', () => {
    fireEvent.click(screen.getByTestId('movie'));
    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});

