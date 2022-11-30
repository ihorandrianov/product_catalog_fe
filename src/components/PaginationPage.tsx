import { ChangeEvent, FC, useState } from 'react';
import { trpc } from '../utils/trpc';
import { Pagination } from './Pagination';
import { ProductCard } from './ProductCard';
import styles from '../styles/PaginationPage.module.css';

export const PaginationPage: FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState('year');

  const selectPage = (page: 'prev' | 'next', maxPages = 0) => {
    if (page === 'prev') {
      setSelectedPage((prev) => Math.max(prev - 1, 1));
      return;
    }
    setSelectedPage((prev) => Math.min(prev + 1, maxPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  const itemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      setItemsPerPage(Number(e.target.value));
    }
  };

  const sortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      setSortBy(e.target.value);
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
        <h1>Mobile Phones</h1>
        <p>{itemsCount && itemsCount._all}</p>
        <div>
          <label htmlFor="items">Items per page</label>
          <select
            name="items"
            id="items"
            onChange={itemsPerPageChange}
            value={itemsPerPage.toString()}
          >
            <option value="24">24</option>
            <option value="16">16</option>
            <option value="8">8</option>
          </select>
          <select
            name="sortBy"
            id="sortBy"
            onChange={sortByChange}
            value={sortBy}
          >
            <option value="price">Highest price</option>
            <option value="year">Newest</option>
          </select>
        </div>
      </article>

      <article className={styles.productsGrid}>
        {(isLoading || pagesCountLoading) && <p>Loading</p>}
        {data &&
          data.map((product) => (
            <ProductCard key={product.itemId} product={product} />
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
