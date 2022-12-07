import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Favourites.module.css';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductCard } from '../../components/ProductCard';
import Home from '../../../public/icons/Home.svg';
import StrokeRight from '../../../public/icons/StrokeRight.svg';
import { trpc } from '../../utils/trpc';
import { Breedcrumbs } from '../../components/Breedcrumbs';

const Favourites: React.FC = () => {
  const { data: phones, isLoading } = trpc.favourites.favoritesRoute.useQuery();

  if (isLoading) {
    <p>Loading</p>;
  }

  console.log(phones);
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <Breedcrumbs />
          </div>
          <h1 className={styles.header}>Favourites</h1>

          <h3 className={styles.subHeader}>{phones?.favorites.length} items</h3>

          <div className={styles.products}>
            {phones &&
              phones.favorites.map((phoneItem) => (
                <ProductCard
                  key={phoneItem.phone.phoneId}
                  product={phoneItem.phone}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Favourites;
