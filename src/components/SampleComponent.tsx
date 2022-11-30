import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { trpc } from '../utils/trpc';
export const SampleComponent: FC = () => {
  const [ref, inView] = useInView();
  const query = trpc.products.getAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (query.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div>{JSON.stringify(query.data)}</div>
      <button
        ref={ref}
        className="button"
        disabled={!query.hasNextPage || query.isFetchingNextPage}
        onClick={() => query.fetchNextPage()}
      >
        Load more
      </button>
    </div>
  );
};
