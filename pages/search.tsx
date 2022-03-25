import {
  useEffect,
  useState,
  useRef,
  FormEvent,
  SetStateAction,
  Dispatch,
} from 'react';

type Movie = {
  title: string;
  summary: string;
  medium_cover_image: string;
  year: number;
  id: number;
};

const MovieItem = (movie: Movie) => {
  const { id, title, year, summary, medium_cover_image } = movie;
  return (
    <div key={id}>
      <h2>
        {title} ({year})
      </h2>
      <img src={medium_cover_image} alt={title} />
      <p>{summary}</p>
    </div>
  );
};

interface SearchFormProps {
  onSearch: Dispatch<SetStateAction<string | number | undefined>>;
}
const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchRef.current) return;
    onSearch(searchRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={searchRef} />
      <button onClick={handleSubmit}>Search</button>
    </form>
  );
};

interface SearchResultsProps {
  isLoading: boolean;
  results: Movie[];
  error: Error | undefined;
}
const SearchResults: React.FC<SearchResultsProps> = ({
  isLoading,
  results,
  error,
}) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!results.length) return <p>No results found</p>;
  return (
    <>
      {results.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
};

const useSearch = () => {
  const [term, setTerm] = useState<string | number | undefined>();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchData = () => {
    setIsLoading(true);
    setError(undefined);
    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${term}`)
      .then((res) => res.json())
      .then((data) => setResults(data.data.movies))
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (term) fetchData();
  }, [term]);

  return {
    term,
    setTerm,
    results,
    isLoading,
    error,
  };
};

export default function SearchPage() {
  const search = useSearch();
  return (
    <>
      <SearchForm onSearch={search.setTerm} />
      <SearchResults {...search} />
    </>
  );
}
