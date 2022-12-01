import { Phones } from '@prisma/client';
import Image from 'next/image';
import { FC, useState } from 'react';
import classNames from 'classnames';
import productStyles from '../styles/ProductCard.module.css';
import typographyDesktop from '../styles/TypographyDesktop.module.css';
import colors from '../styles/Colors.module.css';

type Props = {
  product: Phones;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  
  return (
    <div className={productStyles.card}>
      <Image 
        className={productStyles.card__img}
        src={`/${product.image}`}
        alt={product.name}
        width={208}
        height={196}
      />

      <h2 className={`${productStyles.card__title } ${typographyDesktop.bodyText}`}>
        {product.name}
      </h2>

      <p className={productStyles.card__price}>
        <span className={`${productStyles.card__priceСurrent} ${typographyDesktop.h3Desktop}`}>
          {`$${product.price}`}
        </span>

        <span className={`${productStyles.card__priceFull} ${typographyDesktop.h3Desktop}`}>
          {`$${product.fullPrice}`}
        </span>
      </p>

      <div className={productStyles.card__features}>
        <p className={productStyles.card__feature}>
          <span className={`${productStyles.card__featureName} ${typographyDesktop.smallText}`}>
            Screen
          </span>
          
          <span className={`${productStyles.card__featureValue} ${typographyDesktop.smallText}`}>
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

      <div className={productStyles.card__buy}>
        <a
          onClick={() => {
            setAdded(!added);
          }}
          className={classNames(`${productStyles.card__addToCart}`, 'buttons', {
            'card__addToCartActive': added,
          })}
        >
          {added ? 'Added' : 'Add to cart'}
        </a>

        <a
          onClick={() => {
            setFavorite(!favorite);
          }}
          className={classNames(`${productStyles.card__favoritesIcon}`, {
            'card__favoritesIconActive': favorite,
          })}
        >
        </a>
      </div>
    </div>
  );
};
