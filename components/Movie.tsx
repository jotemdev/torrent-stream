import React, { useContext, useEffect, useState, useRef } from 'react';
import useMovieData from '../hooks/useMovieData';
import useTorrent from '../hooks/useTorrent';
import { MovieContext } from '../pages/_app';
import { Torrent } from '../types';
import { imageUrl } from '../utils/tmdb';
import { getMagnetLink } from '../utils/YIFY';

interface Props {
  id: string | string[] | undefined;
}

type TMDBMovieData = {
  title: string;
  overview: string;
  poster_path: string;
};

export default function Movie({ id }: Props) {
  const { isLoading, data, isError, error } = useMovieData(id);
  const { movieList, setMovieList } = useContext(MovieContext);
  const [torrentsData, setTorrentsData] = useState([] as Torrent[]);
  const outputElement = useRef<HTMLDivElement>(null);
  const { isDownloading, isReady, progress, download } = useTorrent({
    container: outputElement.current,
  });

  useEffect(() => {
    if (!movieList) return;
    const movie = movieList.find((movie: any) => movie.imdb_code === id);
    if (!movie) return;
    setTorrentsData(movie.torrents);
  }, [movieList]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const { title, poster_path, overview } = data.data
    .movie_results[0] as TMDBMovieData;
  const poster = imageUrl(poster_path);

  return (
    <div>
      <h2>{title}</h2>
      <img src={poster} alt={title} />
      <p>{overview}</p>

      <div>Downloading: {progress}%</div>
      <div id="video" ref={outputElement}></div>

      {torrentsData.length > 0 && (
        <ul>
          {torrentsData.map((torrent: Torrent) => {
            const magnetUrl = getMagnetLink(torrent.hash, title);
            return (
              <li key={torrent.url}>
                <strong
                  onClick={() => {
                    console.log(magnetUrl);
                    download(magnetUrl);
                  }}>
                  {torrent.quality} - {torrent.size} :
                </strong>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
