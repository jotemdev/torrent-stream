export const baseUrl = 'https://api.themoviedb.org/3'
export const apiKey = '740ae8890ac36785dd9b032b66a402fc'
export const imageBaseUrl = 'https://image.tmdb.org/t/p/'
export const imageSize = 'w500'
export const imageUrl = (path: string) => `${imageBaseUrl}${imageSize}${path}`
export const makeApiRoute = (route: string) => `${baseUrl}${route}?api_key=${apiKey}`
export const routes = {
    trending: (mediaType: 'movie' | 'tv' | 'person' | 'all') => `/trending/${mediaType}/week`,
    search: (mediaType: 'movie' | 'tv' | 'person' ) => `/search/${mediaType}`,
    genre: (mediaType: 'movie' | 'tv' | 'person' ) => `/genre/${mediaType}/list`,
    movie: {
        details: (id: string) => `/movie/${id}`,
        credits: (id: string) => `/movie/${id}/credits`,
        images: (id: string) => `/movie/${id}/images`,
        videos: (id: string) => `/movie/${id}/videos`,
        recommendations: (id: string) => `/movie/${id}/recommendations`,
        similar: (id: string) => `/movie/${id}/similar`,
        reviews: (id: string) => `/movie/${id}/reviews`,
    },
    tv: {
        details: (id: string) => `/tv/${id}`,
        credits: (id: string) => `/tv/${id}/credits`,
        images: (id: string) => `/tv/${id}/images`,
        videos: (id: string) => `/tv/${id}/videos`,
        recommendations: (id: string) => `/tv/${id}/recommendations`,
        similar: (id: string) => `/tv/${id}/similar`,
        reviews: (id: string) => `/tv/${id}/reviews`,
    },
    person: {
        details: (id: string) => `/person/${id}`,
        credits: (id: string) => `/person/${id}/movie_credits`,
        images: (id: string) => `/person/${id}/images`,
        movies: (id: string) => `/person/${id}/movie_credits`,
        tv: (id: string) => `/person/${id}/tv_credits`,
    },
}

export const getTrendingUrl = (mediaType) => makeApiRoute(routes.trending(mediaType))
export const getSearchUrl = (mediaType) => makeApiRoute(routes.search(mediaType))
export const getGenreUrl = (mediaType) => makeApiRoute(routes.genre(mediaType))

export const getEntryRouteUrl = (id: string, type: string, route?: string) => {
    const routeName = route ? route : 'details'
    const getRoute = routes[type][routeName]
    const url = getRoute(id)
    return makeApiRoute(url)
}

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
}
export default apiVars
