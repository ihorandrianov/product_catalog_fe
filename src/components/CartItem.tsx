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

type Props = {
  phone: Phones;
};

export const CartItem: FC<Props> = ({ phone }) => {
  // const myStorage = window.localStorage;
  // localStorage.setItem('item1', "apple-iphone-7-32gb-black");
  // localStorage.setItem('item2', "apple-iphone-7-plus-32gb-black");
  
  // console.log(myStorage);
  
  // const LC = "apple-iphone-7-32gb-black";
  // const query = trpc.products.getAllFromLS.useQuery({ myStorage });

  return (
    <div className={styles.item}>
      <div className={styles.item_about}>
        <button 
          type='button' 
          className={styles.button_close}
        >
          <Image
            className={styles.close}
            src={close}
            alt="close"
          />
        </button>

        <Image
          className={styles.image}
          src={`/${phone.image}`}
          height={66}
          width={66}
          alt="phone"
        />
        
        <div className={styles.link}>
          <Link 
            href={{
              pathname: '/phones/[id]',
              query: getPhoneRoute(phone.phoneId),
            }}
            className={fonts.bodyText}
          >
            {phone.name}
          </Link>
        </div>
      </div>

      <div className={styles.item_price}>
        <div className={styles.button_container}>
          <button 
            type='button' 
            className={styles.button}
            disabled
          >
            <Image 
              className={styles.button_image}
              src={minus}
              alt='minus'
            />
          </button>

          <p className={fonts.bodyText}>1</p>

          <button 
            type='button' 
            className={styles.button}
          >
            <Image 
              className={styles.button_image}
              src={plus}
              alt='plus'
            />
          </button>
        </div>

        <p className={`${styles.price} ${fonts.h3}`}>
          {`$${phone.price}`}
        </p>
      </div>
    </div>
  );
};