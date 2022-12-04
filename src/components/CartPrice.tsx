import { FC } from "react";
import styles from '../styles/CartPrice.module.css';
import fonts from '../styles/Typography.module.css';
import phones from '../../seeding_material/db.json';

export const CartPrice: FC = () => {
  const totalPrice = phones.map(phone => phone.price).reduce((acc, curr) => acc + curr);

  return (
    <div className={styles.price}>
      <p className={`${styles.total} ${fonts.h2}`}>
        {totalPrice}
      </p>

      <p className={`${styles.count} ${fonts.bodyText}`}>
        {`Total for ${phones.length} items`}
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