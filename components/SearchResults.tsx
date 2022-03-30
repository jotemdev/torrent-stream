import { YTSSearchResults } from '../types';
import MoviesList from './MoviesList';

export function SearchResults({ isError, isLoading, data }: any) {
  if (isLoading) return <p>Loading...</p>;
  if (!data || isError) return <p>Oops... something went wrong</p>;
  const { movie_count, movies } = data;
  if (movie_count === 0) return <p>No results found</p>;

  return <MoviesList movies={movies} />;
}
