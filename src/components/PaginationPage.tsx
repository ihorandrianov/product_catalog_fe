import { ChangeEvent, FC, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { Pagination } from './Pagination';
import { ProductCard } from './ProductCard';
import styles from '../styles/PaginationPage.module.css';
import { useRouter } from 'next/router';
import { Breedcrumbs } from './Breedcrumbs';

//TODO Add getServerSideProps() to page component
export const PaginationPage: FC = () => {
  const router = useRouter();
  const defaultSortBy = (router.query.sortBy as string) || 'year';
  const defaultItemPerPage = Number(router.query.items) || 16;
  const [selectedPage, setSelectedPage] = useState(
    Number(router.query.page) || 1,
  );
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPage);
  const [sortBy, setSortBy] = useState(defaultSortBy);

  const selectPage = (page: 'prev' | 'next', maxPages = 0) => {
    if (page === 'prev') {
      setSelectedPage((prev) => Math.max(prev - 1, 1));
      router.replace({
        query: { ...router.query, page: Number(router.query.page) - 1 },
      });
      return;
    }
    setSelectedPage((prev) => Math.min(prev + 1, maxPages));
    router.replace({
      query: { ...router.query, page: Number(router.query.page) + 1 },
    });
  };

  const handlePageClick = (pageNumber: number) => {
    setSelectedPage(pageNumber);
    router.replace({
      query: { ...router.query, page: pageNumber },
    });
  };

  const itemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      setItemsPerPage(Number(e.target.value));
      router.replace({
        query: {
          ...router.query,
          items: e.target.value,
        },
      });
    }
  };

  const sortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      setSortBy(e.target.value);
      router.replace({
        query: { ...router.query, sortBy: e.target.value },
      });
    }
  };

  const { data: itemsCount, isLoading: pagesCountLoading } =
    trpc.products.countItems.useQuery();

  const { data, isLoading } = trpc.products.getSome.useQuery({
    limit: itemsPerPage,
    page: selectedPage - 1,
    sortBy,
  });

  if (pagesCountLoading) {
    return <p>Loading</p>;
  }

  const pagesCount = Math.floor(itemsCount!._all / itemsPerPage) + 1;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <section className={styles.page}>
      <article className={styles.titleSection}>
        <Breedcrumbs />
        <h1 className={styles.titleFont}>Mobile Phones</h1>
        <p className={styles.modelsCount}>{`${
          itemsCount && itemsCount._all
        } items`}</p>
        <div className={styles.selectorGroup}>
          <div className={styles.selector}>
            <label className={styles.selectorLabel} htmlFor="items">
              Items on page:
            </label>
            <select
              className={styles.select}
              name="items"
              id="items"
              onChange={itemsPerPageChange}
              value={itemsPerPage.toString()}
            >
              <option value="24">24</option>
              <option value="16">16</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className={styles.selector}>
            <label className={styles.selectorLabel} htmlFor="sortBy">
              Sort by:
            </label>
            <select
              className={styles.select}
              name="sortBy"
              id="sortBy"
              onChange={sortByChange}
              value={sortBy}
            >
              <option value="price">Highest price</option>
              <option value="year">Newest</option>
            </select>
          </div>
        </div>
      </article>

      <article className={styles.productsGrid}>
        {(isLoading || pagesCountLoading) && <p>Loading</p>}
        {data &&
          data.map((product) => (
            <ProductCard key={product.phoneId} product={product} />
          ))}
      </article>
      <Pagination
        selectedPage={selectedPage}
        selectPage={selectPage}
        handlePageClick={handlePageClick}
        pages={pages}
      />
    </section>
  );
};
