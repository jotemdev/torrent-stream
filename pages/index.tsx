import type { NextPage } from 'next';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as UILink,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { BsFillMoonFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';

import Head from 'next/head';
import TopBar from '../components/TopBar';
import { YTSSearchResults } from '../types';
import useSearch from '../hooks/useSearch';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>mooviz.watch - The best way to watch movies online</title>
        <meta
          name="description"
          content="A modern web app for browsing and searching movies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <main>
        <HStack>
          <Link href="/test">
            <UILink color="blue.500">
              Click here to navigate to the download page
            </UILink>
          </Link>
          <Link href="/search">
            <UILink color="blue.500">Search YTS</UILink>
          </Link>
        </HStack>
      </main>
    </>
  );
};

export default Home;
