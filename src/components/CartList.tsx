import { FC } from 'react';
import { trpc } from '../utils/trpc';
import styles from '../styles/CartList.module.css';
import { CartProductItem } from './CartProductItem';
import { CartItem, Phones } from "@prisma/client";

type Props = {
  products: (CartItem & {
    phone: Phones;
  })[] | undefined;
}

export const CartList: FC<Props> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products &&
        products.map(phoneItem => (
          <li key={phoneItem.phone.phoneId}>
            <CartProductItem
              product={phoneItem.phone}
              quantity={phoneItem.quantity}
            />
          </li>
        ))}
    </ul>
  );
}