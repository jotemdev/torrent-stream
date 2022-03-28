import { Heading, Stack, Image, AspectRatio } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { MovieContext } from '../pages/_app';
import { Movie } from '../types';

const MovieItem = (movie: Movie) => {
  const { id, title, year, medium_cover_image } = movie;

  return (
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
  );
};

export default MovieItem;
