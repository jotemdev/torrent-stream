import { useQuery } from 'react-query';
import axios from 'axios';
import { getEntryRouteUrl } from '../utils/tmdb';
import { UseQueryResult } from 'react-query/types';

const fetchMovieData = async (url: string) => {
  return axios.get(url);
};

export const useMovieData = (
  id: string | string[] | undefined,
  route?: string,
) => {
  const url = getEntryRouteUrl(id, 'movie', route);
  const result = useQuery([id, route], () => fetchMovieData(url));

  return result as UseQueryResult<any, Error>;
};

export default useMovieData;
