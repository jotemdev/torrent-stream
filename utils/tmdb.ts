export const baseUrl = 'https://api.themoviedb.org/3';
export const apiKey = '740ae8890ac36785dd9b032b66a402fc';
export const imageBaseUrl = 'https://image.tmdb.org/t/p/';
export const imageSize = 'w500';
export const imageUrl = (path: string) => `${imageBaseUrl}${imageSize}${path}`;
export const makeApiRoute = (route: string) =>
  `${baseUrl}${route}?api_key=${apiKey}`;
export const routes = {
  trending: (mediaType: 'movie' | 'tv' | 'person' | 'all') =>
    makeApiRoute(`/trending/${mediaType}/week`),
  search: (mediaType: 'movie' | 'tv' | 'person') =>
    makeApiRoute(`/search/${mediaType}`),
  genre: (mediaType: 'movie' | 'tv') =>
    makeApiRoute(`/genre/${mediaType}/list`),
  entry: (id: string, type: string, route?: string) => {
    const routeName = route ? '/' + route : '';
    const path = `/${type}/${id}${routeName}`;
    return makeApiRoute(path);
  },
};

export const getTrendingUrl = (mediaType) => routes.trending(mediaType);
export const getSearchUrl = (mediaType) => routes.search(mediaType);
export const getGenreUrl = (mediaType) => routes.genre(mediaType);
export const getEntryRouteUrl = (id: string, type: string, route?: string) =>
  routes.entry(id, type, route);

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
