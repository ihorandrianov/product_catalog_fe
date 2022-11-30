import { Phones } from '@prisma/client';
import { FC, Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { trpc } from '../utils/trpc';
import { ProductCard } from './ProductCard';
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

  console.log(query.data);

  return (
    <div>
      <div>
        {query.data?.pages.map((page) => (
          <Fragment key={page.items[0].id}>
            {page.items.map((product: Phones) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Fragment>
        ))}
      </div>
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
