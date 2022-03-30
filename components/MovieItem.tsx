import { Heading, Stack, Image, AspectRatio, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext, useEffect } from 'react';
import { MovieContext } from '../pages/_app';
import { YTSMovie as Movie } from '../types';

const MovieItem = (movie: Movie) => {
  const { id, title, year, medium_cover_image, imdb_code } = movie;

  return (
    <NextLink href={`/movie/${imdb_code}`} passHref>
      <Link>
        <Stack key={id}>
          <AspectRatio maxW="400px" ratio={2 / 3}>
            <Image
              src={medium_cover_image}
              alt={title}
              borderRadius="md"
              width="100%"
            />
          </AspectRatio>
          <Heading as="h3" size="md">
            {title} ({year})
          </Heading>
        </Stack>
      </Link>
    </NextLink>
  );
};

export default MovieItem;
