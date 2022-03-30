export const baseUrl = 'https://api.themoviedb.org/3';
export const apiKey = '740ae8890ac36785dd9b032b66a402fc';
export const imageBaseUrl = 'https://image.tmdb.org/t/p/';
export const imageSize = 'w500';
export const imageUrl = (path: string) => `${imageBaseUrl}${imageSize}${path}`;
export const makeApiRoute = (route: string) =>
  `${baseUrl}${route}?api_key=${apiKey}`;
export const routes = {
  trending: (mediaType: string | string[]) =>
    makeApiRoute(`/trending/${mediaType}/week`),
  search: (mediaType: string) => makeApiRoute(`/search/${mediaType}`),
  genre: (mediaType: string) => makeApiRoute(`/genre/${mediaType}/list`),
  entry: (id: string | string[] | undefined, type: string, route?: string) => {
    const routeName = route ? '/' + route : '';
    const path = `/${type}/${id}${routeName}`;
    return makeApiRoute(path);
  },
};

export const getTrendingUrl = (mediaType: string | string[]) =>
  routes.trending(mediaType);
export const getSearchUrl = (mediaType: string) => routes.search(mediaType);
export const getGenreUrl = (mediaType: string) => routes.genre(mediaType);
export const getEntryRouteUrl = (
  id: string | string[] | undefined,
  type: string,
  route?: string,
) => routes.entry(id, type, route);
export const getSearchMovieUrl = (query: string | string[] | undefined) =>
  `${getSearchUrl('movie')}&query=${query}`;
export const findMovieByImdbIdUrl = (
  imdb_code: string | string[] | undefined,
) => `${baseUrl}/find/${imdb_code}?api_key=${apiKey}&external_source=imdb_id`;

export const apiVars = {
  baseUrl,
  apiKey,
  imageBaseUrl,
  imageSize,
  imageUrl,
  routes,
  getEntryRouteUrl,
  getTrendingUrl,
  getSearchUrl,
  getGenreUrl,
};

export default apiVars;
