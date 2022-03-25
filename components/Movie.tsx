import React from 'react';
import useMovieData from '../hooks/useMovieData';
import { imageUrl } from '../utils/tmdb';

interface Props {
  id: string | string[] | undefined;
}

type MovieData = {
  title: string;
  overview: string;
  poster_path: string;
};

export default function Movie({ id }: Props) {
  const { isLoading, data, isError, error } = useMovieData(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const { title, poster_path, overview }: MovieData = data.data;
  const poster = imageUrl(poster_path);

  return (
    <div>
      <h2>{title}</h2>
      <img src={poster} alt={title} />
      <p>{overview}</p>
    </div>
  );
}
