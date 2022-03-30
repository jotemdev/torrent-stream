import { Dispatch, SetStateAction } from 'react';
import TQueryFnData from 'react-query/types';

export type searchQuery = string | string[] | undefined;

export type Torrent = {
  url: string;
  hash: string;
  quality: string;
  type: string;
  seeds: number;
  size: string;
};
//{ data: undefined; error: null; isError: false; isIdle: true; isLoading: false; isLoadingError: false; isRefetchError: false; isSuccess: false; status: "idle"; }

export type UseQueryResult = {
  data: YTSData | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isRefetchError: boolean;
  isSuccess: boolean;
  status: 'idle' | 'loading' | 'success' | 'error' | 'refetch';
};

export interface YTSSearchResults extends UseQueryResult {
  term: string | undefined;
  setTerm: Dispatch<SetStateAction<searchQuery>>;
}

export type YTSMovie = {
  title: string;
  summary: string;
  medium_cover_image: string;
  year: number;
  id: number;
  imdb_code: string;
  torrents: Torrent[];
};

export type YTSData = {
  movies: YTSMovie[];
  movie_count: number;
  limit: number;
  page_number: number;
};

export type MoviesState = {
  movies: YTSMovie[];
  moviesError: string;
  moviesLoading: boolean;
};
