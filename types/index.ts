export type Movie = {
  title: string;
  summary: string;
  medium_cover_image: string;
  year: number;
  id: number;
};

export type YTSData = {
  movies: Movie[];
  movie_count: number;
  limit: number;
  page_number: number;
};

export type MoviesState = {
  movies: Movie[];
  moviesError: string;
  moviesLoading: boolean;
};
