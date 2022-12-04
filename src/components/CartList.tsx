import { FC } from 'react';
import styles from '../styles/CartList.module.css';
import { CartItem } from './CartItem';
import phones from '../../seeding_material/db.json'; //will update

export const CartList: FC = () => {
  return (
    <ul className={styles.list}>
      {phones.map(phone => (
        <li key={phone.phoneId}>
          <CartItem phone={phone} />
        </li>
      ))}
    </ul>
  );
}