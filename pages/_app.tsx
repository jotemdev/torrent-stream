import { createContext, useState } from 'react';
import '../styles/globals.css';
import '@fontsource/darker-grotesque/400.css';
import '@fontsource/darker-grotesque/700.css';
import theme from '../theme';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Movie } from '../types';

const queryClient = new QueryClient();

export const MovieContext = createContext(
  {} as {
    movieList: Movie[];
    setMovieList: (movieList: Movie[]) => void;
  },
);

function MyApp({ Component, pageProps }: AppProps) {
  const [movieList, setMovieList] = useState([] as Movie[]);
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <MovieContext.Provider value={{ movieList, setMovieList }}>
          <Component {...pageProps} />
        </MovieContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
