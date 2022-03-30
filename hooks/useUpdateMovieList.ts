import { useContext } from 'react';
import { MovieContext } from '../pages/_app';
import { YTSMovie as Movie } from '../types';

const useUpdateMovieList = () => {
  const { movieList, setMovieList } = useContext(MovieContext);
  const cacheMovies = (movies: Movie[]) => {
    const newMovies = movies.filter(
      (movie: Movie) => !movieList.find((m) => m.id === movie.id),
    );
    setMovieList([...movieList, ...newMovies]);
  };

  return cacheMovies;
};

export default useUpdateMovieList;
