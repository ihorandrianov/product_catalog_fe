import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { CartList } from '../../components/CartList';
import { CartPrice } from '../../components/CartPrice';
import back from '../../../public/icons/Stroke-left.svg';
import fonts from '../../styles/Typography.module.css';
import styles from '../../styles/CartPage.module.css';
import { trpc } from '../../utils/trpc';
import CartGrid from '../../components/CartPageLoader';

export const CartPage: NextPage = () => {
  const { isLoading } = trpc.products.getAll.useQuery();

  if (isLoading) {
    return <CartGrid />;
  }
  
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta name="description" content="Cart"/>
      </Head>

      <div className={styles.container}>
        <button className={styles.button}>
          <Image src={back} className={styles.back} alt="back" />

          <Link href="/" className={`${styles.back} ${fonts.buttons}`}>
            Back
          </Link>
        </button>

        <h1 className={`${styles.header} ${fonts.h1}`}>Cart</h1>

        <div className={styles.cart}>
          <CartList />

          <CartPrice />
        </div>
      </div>
    </>
  );
};