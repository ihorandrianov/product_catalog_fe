import { NextPage } from "next";
import Link from "next/link";
import Image from 'next/image';
import Header from "../components/Header";
import { CartList } from "../components/CartList";
import { CartPrice } from "../components/CartPrice";
import { Footer } from "../components/Footer";
import back from '../../public/icons/Stroke-left.svg'
import fonts from '../styles/Typography.module.css';
import styles from '../styles/CartPage.module.css';

export const CartPage: NextPage = () => {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <button className={styles.button}>
          <Image
              src={back}
              className={styles.back}
              alt='back'
            />
          
          <Link
            href="/"
            className={`${styles.back} ${fonts.buttons}`}
          >
            Back
          </Link>
        </button>

        <h1 className={`${styles.header} ${fonts.h1}`}>
          Cart
        </h1>

        <div className={styles.cart}>
          <CartList />

          <CartPrice />
        </div>
      </div>

      <Footer />
    </>
  );
};