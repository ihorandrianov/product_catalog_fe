import { FC } from 'react';
import { trpc } from '../utils/trpc';
import styles from '../styles/CartList.module.css';
import { CartItem } from './CartItem';

export const CartList: FC = () => {
  const { data } = trpc.products.getAll.useQuery();

  return (
    <ul className={styles.list}>
      {data?.items.map(phone => (
        <li key={phone.phoneId}>
          <CartItem phone={phone} />
        </li>
      ))}
    </ul>
  );
}