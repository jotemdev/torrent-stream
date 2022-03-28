import { SimpleGrid } from '@chakra-ui/react';
import { Movie } from '../types';
import MovieItem from './MovieItem';

interface MoviesListProps {
  movies: Movie[];
}
const MoviesList: React.FC<MoviesListProps> = ({ movies }) => (
  <SimpleGrid columns={5} spacing={6}>
    {movies.map((movie) => (
      <MovieItem key={movie.id} {...movie} />
    ))}
  </SimpleGrid>
);

export default MoviesList;
