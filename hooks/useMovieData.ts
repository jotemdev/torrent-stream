import { useQuery } from 'react-query';
import axios from 'axios';
import {
  findMovieByImdbIdUrl,
  getEntryRouteUrl,
  getSearchMovieUrl,
} from '../utils/tmdb';
import { UseQueryResult } from 'react-query/types';

const fetchMovieData = async (url: string) => {
  return axios.get(url);
};

export const useMovieData = (
  id: string | string[] | undefined,
  route?: string,
) => {
  const url = findMovieByImdbIdUrl(id);
  const result = useQuery([id, route], () => fetchMovieData(url));

  return result as UseQueryResult<any, Error>;
};

export default useMovieData;
