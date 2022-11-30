import { Phones } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';
import productStyles from '../styles/ProductCard.module.css';

type Props = {
  product: Phones;
};

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className={productStyles.card}>
      <Image
        src={`/${product.image}`}
        alt={product.name}
        width={208}
        height={196}
      />
      <p>Hello</p>
    </div>
  );
};
