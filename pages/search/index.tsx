import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SearchResults } from '../../components/SearchResults';
import TopBar from '../../components/TopBar';
import useSearch from '../../hooks/useSearch';

export default function SearchPage() {
  const search = useSearch();
  const router = useRouter();
  const query = router.query.s;

  useEffect(() => {
    if (query && !Array.isArray(query)) {
      search.setTerm(query);
    }
  }, [query]);

  return (
    <>
      <TopBar />
      {search.term && <SearchResults {...search} />}
    </>
  );
}
