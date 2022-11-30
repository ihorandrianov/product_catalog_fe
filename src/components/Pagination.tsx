import { FC } from 'react';
import styles from '../styles/Pagination.module.css';
import { trpc } from '../utils/trpc';

type Props = {
  selectedPage: number;
  selectPage: (page: 'prev' | 'next', maxPages?: number) => void;
  handlePageClick: (pageNumber: number) => void;
  pages: number[];
};

const FIRST_PAGE = 1;

export const Pagination: FC<Props> = ({
  selectedPage,
  selectPage,
  handlePageClick,
  pages,
}) => {
  return (
    <div className={styles.page}>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.navButton}
          onClick={() => selectPage('prev')}
          disabled={selectedPage === FIRST_PAGE}
        >
          p
        </button>
        {pages &&
          pages.map((page: number) => (
            <button
              className={
                selectedPage === page
                  ? styles.selectedButton
                  : styles.pageButton
              }
              onClick={() => {
                handlePageClick(page);
              }}
              key={page}
            >
              {page}
            </button>
          ))}
        <button
          onClick={() => selectPage('next', pages.length)}
          className={styles.navButton}
          disabled={selectedPage === pages.length}
        >
          n
        </button>
      </div>
    </div>
  );
};
