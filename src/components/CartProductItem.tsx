import { FC } from "react";
import { Phones } from "@prisma/client";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/CartItem.module.css';
import fonts from '../styles/Typography.module.css';
import close from '../../public/icons/CloseGrey.svg';
import minus from '../../public/icons/Minus.svg';
import plus from '../../public/icons/Plus.svg';
import { getPhoneRoute } from "../utils/utilities";
import { trpc } from '../utils/trpc';

type Props = {
  product: Phones;
  quantity: number;
};

export const CartProductItem: FC<Props> = ({ product, quantity }) => {
  const minusMutation = trpc.cart.updateMinus.useMutation();
  const plusMutation = trpc.cart.updatePlus.useMutation();
  const deleteMutation = trpc.cart.deleteItem.useMutation();

  const handleMinus = (phoneId: string) => {
    minusMutation.mutate(phoneId);
  };

  const handlePlus = (phoneId: string) => {
    plusMutation.mutate(phoneId);
  };

  const handleDelete = (phoneId: string) => {
    deleteMutation.mutate(phoneId);
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_about}>
        <button 
          type='button' 
          className={styles.button_close}
          onClick={() => {handleDelete(product.phoneId)}}
        >
          <Image
            className={styles.close}
            src={close}
            alt="close"
          />
        </button>

        <Image
          className={styles.image}
          src={`/${product.image}`}
          height={66}
          width={66}
          alt="phone"
        />
        
        <div className={styles.link}>
          <Link 
            href={{
              pathname: '/phones/[id]',
              query: getPhoneRoute(product.phoneId),
            }}
            className={fonts.bodyText}
          >
            {product.name}
          </Link>
        </div>
      </div>

      <div className={styles.item_price}>
        <div className={styles.button_container}>
          <button 
            type='button' 
            className={styles.button}
            onClick={() => {handleMinus(product.phoneId)}}
          >
            <Image 
              className={styles.button_image}
              src={minus}
              alt='minus'
            />
          </button>

          <p className={fonts.bodyText}>
            {quantity}
          </p>

          <button 
            type='button' 
            className={styles.button}
            onClick={() => {handlePlus(product.phoneId)}}
          >
            <Image 
              className={styles.button_image}
              src={plus}
              alt='plus'
            />
          </button>
        </div>

        <p className={`${styles.price} ${fonts.h3}`}>
          {`$${product.price}`}
        </p>
      </div>
    </div>
  );
};