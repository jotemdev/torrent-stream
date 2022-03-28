import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import useSearch from '../hooks/useSearch';
import { YTSData } from '../types';
import { Dispatch, SetStateAction } from 'react';

interface SearchResults {
  isError: boolean;
  isLoading: boolean;
  data: YTSData | undefined;
  error: Error | null | unknown;
  term: string | undefined;
  setTerm: Dispatch<SetStateAction<string | undefined>>;
}

export function SearchResults({ isError, isLoading, data }: SearchResults) {
  if (isLoading) return <p>Loading...</p>;
  if (!data || isError) return <p>Oops... something went wrong</p>;
  const { movie_count, movies } = data;
  if (movie_count === 0) return <p>No results found</p>;

  return <MoviesList movies={movies} />;
}

export default function SearchPage() {
  const search: SearchResults = useSearch();

  return (
    <>
      <SearchForm onSearch={search.setTerm} />
      {search.term && <SearchResults {...search} />}
    </>
  );
}
