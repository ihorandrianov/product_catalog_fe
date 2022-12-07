import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Favourites.module.css'
import { getFavouritesPhones } from '../../utils/trpc';
import Header  from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProductCard } from "../../components/ProductCard";
import Home from '../../../public/icons/Home.svg'
import StrokeRight from "../../../public/icons/StrokeRight.svg"

const Favourites: React.FC = () => {
   const [phones, setPhones] = useState([]);

  async function loadFavouritesPhones(): Promise<any> {
    const favourites = localStorage.getItem('favourites');

    if (favourites) {
      const responseFromServer = await getFavouritesPhones(favourites);

      setPhones(responseFromServer);
    }
  }

  useEffect(() => {
    void loadFavouritesPhones();
  }, []);
  
  return (
    <>
      <Header />
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.nav}>
              <Link
                href="/"
                className={styles.back}
              >
                <Image
                  src={Home}
                  className={styles.icon}
                  alt='back'
                />
                <Image
                  src={StrokeRight}
                  className={styles.icon}
                  alt='back'
                />
              </Link>
            
              <p className={styles.current}>
                  Favourites
              </p>
            </div>
            <h1 className={styles.header}>
                Favourites
            </h1>

            <h3 className={styles.subHeader}>{phones.length} items</h3>

            <div className={styles.products}>
                {phones.map(phone => <ProductCard product={phone} />)}
            </div>
          </div>
        </div>
        
       <Footer />
    </>
  )
};


export default Favourites;
