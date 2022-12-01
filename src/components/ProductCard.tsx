import { Phones } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';
import productStyles from '../styles/ProductCard.module.css';
import typographyMobile from '../styles/TypographyMobile.module.css';
import typographyDesktop from '../styles/TypographyDesktop.module.css';
import colors from '../styles/Colors.module.css';

type Props = {
  product: Phones;
};

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className={productStyles.card}>
      <Image 
        className={productStyles.card__img}
        src={`/${product.image}`}
        alt={product.name}
        width={208}
        height={196}
      />

      <h2 className={`${productStyles.card__title} ${typographyDesktop.bodyText}`}>
        {product.name}
      </h2>

      <p className={productStyles.card__price}>
        <span className={productStyles.card__priceСurrent}
          >
          {`$${product.price}`}
        </span>

        <span className={productStyles.card__priceFull}>
          {`$${product.fullPrice}`}
        </span>
      </p>

      <div className={productStyles.card__features}>
        <p className={productStyles.card__feature}>
          <span className={productStyles.card__featureName}>
            Screen
          </span>
          
          <span className={productStyles.card__featureValue}>
            {product.screen}
          </span>
        </p>

        <p className={productStyles.card__feature}>
          <span className={productStyles.card__featureName}>
            Capacity
          </span>
          
          <span className={productStyles.card__featureValue}>
            {product.capacity}
          </span>
        </p>

        <p className={productStyles.card__feature}>
          <span className={productStyles.card__featureName}>
            RAM
          </span>
          
          <span className={productStyles.card__featureValue}>
            {product.ram}
          </span>
        </p>
      </div>

      <a 
        className={productStyles.card__price}
        href="#"
      >
        Add to cart
      </a>
    </div>
  );
};
