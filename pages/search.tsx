import { useEffect, useState, useRef } from 'react';

export default function SearchPage() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = () => {
    if (!searchRef.current) return;
    setTerm(searchRef.current.value);
  };

  const loading = isLoading ? <p>Loading...</p> : '';
  const errorMessage = error ? <p>{error.message}</p> : '';
  const resultList = !results.length
    ? ''
    : results.map((movie) => {
        const { id, title, year, summary, medium_cover_image, torrents } =
          movie;
        return (
          <div key={id}>
            <h2>
              {title} ({year})
            </h2>
            <img src={medium_cover_image} alt={title} />
            <p>{summary}</p>
          </div>
        );
      });

  return (
    <div>
      <input type="text" ref={searchRef} />
      <button onClick={handleSubmit} disabled={isLoading}>
        Search
      </button>
      {errorMessage}
      {loading}
      {!isLoading && resultList}
    </div>
  );
}
