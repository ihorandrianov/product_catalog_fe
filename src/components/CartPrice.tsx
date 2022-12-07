import { FC } from "react";
import { trpc } from '../utils/trpc';
import styles from '../styles/CartPrice.module.css';
import fonts from '../styles/Typography.module.css';

export const CartPrice: FC = () => {
  const { data } = trpc.products.getAll.useQuery();
  const totalPrice = data?.items.map(phone => phone.price).reduce((acc, curr) => acc + curr);

  return (
    <div className={styles.price}>
      <p className={`${styles.total} ${fonts.h2}`}>
        {totalPrice}
      </p>

      <p className={`${styles.count} ${fonts.bodyText}`}>
        {`Total for ${data?.items.length} items`}
      </p>

      <div className={styles.button_container}>
        <button 
          type='button' 
          className={`${styles.button} ${fonts.buttons}`}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}