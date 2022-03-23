import React from 'react';
import useMovieData from '../../hooks/useMovieData';
import { useRouter } from 'next/router';
import { imageUrl } from '../../utils/tmdb';

export default function Movie() {
  const router = useRouter();
  const id = router.query.id;
  const { isLoading, data, isError, error } = useMovieData(id);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  const { title, poster_path, overview } = data.data;
  const poster = imageUrl(poster_path);

  return (
    <div>
      <h2>{title}</h2>
      <img src={poster} alt={title} />
      <p>{overview}</p>
    </div>
  );
}
