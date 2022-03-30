import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useUpdateMovieList from './useUpdateMovieList';
import { getSearchUrl } from '../utils/YIFY';
import { searchQuery } from '../types';

export const useSearch = (initialTerm?: searchQuery) => {
  const [term, setTerm] = useState(initialTerm);
  const fetchSearchResults = () => {
    if (!term)
      return {
        movies: [],
        movie_count: 0,
      };
    return fetch(getSearchUrl(term))
      .then((res) => res.json())
      .then((data) => data.data);
  };
  const search = useQuery(['search', term], fetchSearchResults);
  const cacheMovies = useUpdateMovieList();

  useEffect(() => {
    if (search.data && search.data.movies) {
      cacheMovies(search.data.movies);
    }
  }, [search.data]);

  return { term, setTerm, ...search };
};

export default useSearch;
