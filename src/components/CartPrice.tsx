import { FC } from "react";
import { trpc } from '../utils/trpc';
import styles from '../styles/CartPrice.module.css';
import fonts from '../styles/Typography.module.css';
import { CartItem, Phones } from "@prisma/client";

type Props = {
  products: (CartItem & {
    phone: Phones;
  })[];
}

export const CartPrice: FC<Props> = ({ products }) => {
  const totalPrice = products
    .map(phoneItem => phoneItem.phone.price * phoneItem.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles.price}>
      <p className={`${styles.total} ${fonts.h2}`}>
        {`$${totalPrice}`}
      </p>

      <p className={`${styles.count} ${fonts.bodyText}`}>
        {`Total for ${products?.length} items`}
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