import { useQuery } from 'react-query';
import axios from 'axios';
import { getEntryRouteUrl } from '../utils/tmdb';

const fetchMovieData = async (url: string) => {
  return axios.get(url);
};

export const useMovieData = (id: string, route?: string) => {
  const url = getEntryRouteUrl(id, 'movie', route);

  return useQuery([id, route], () => fetchMovieData(url));
};

export default useMovieData;
