import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Movie from '../../components/Movie';

export default function MoviePage() {
  const router = useRouter();
  const queryId = router.query.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!queryId) return;
    setIsLoading(!queryId);
  }, [queryId]);

  return isLoading ? <p>Loading...</p> : <Movie id={queryId} />;
}
