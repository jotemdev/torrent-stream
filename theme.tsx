import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Darker Grotesque, sans-serif',
    body: 'Darker Grotesque, sans-serif',
  },
  components: {
    Heading: {
      variants: {
        logo: {
          color: 'purple.300',
          fontFamily: 'Dela Gothic One',
          transition: 'all 0.4s',
          _hover: {
            color: 'orange.500',
          },
          _dark: {
            _hover: {
              color: 'orange.200',
            },
          },
        },
      },
    },
  },
});

export default theme;
