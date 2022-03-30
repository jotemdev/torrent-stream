import {
  Stack,
  Heading,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import router from 'next/router';
import { BsFillMoonFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import SearchForm from './SearchForm';

export default function TopBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleSearch = (query: string) => {
    router.push(`/search?s=${query}`);
  };

  return (
    <Stack isInline spacing={8} align="center" justify="space-between" p={3}>
      <Heading as="h1" size="lg" variant="logo">
        <Link href="/">mooviz</Link>
      </Heading>
      <Container maxW="2xl">
        <SearchForm onSearch={handleSearch} />
      </Container>
      <IconButton
        aria-label={'Toggle ' + colorMode === 'light' ? 'Dark' : 'Light'}
        icon={colorMode === 'light' ? <BsFillMoonFill /> : <FiSun />}
        onClick={toggleColorMode}></IconButton>
    </Stack>
  );
}
