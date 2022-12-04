import { Phones } from '@prisma/client';
import Image from 'next/image';
import { FC, useState } from 'react';
import classNames from 'classnames';
import productStyles from '../styles/ProductCard.module.css';
import typography from '../styles/Typography.module.css';
import Link from 'next/link';
import { getPhoneRoute } from '../utils/utilities';

type Props = {
  product: Phones;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  return (
    <div className={productStyles.card}>
      <Link
        key={product.itemId}
        href={{
          pathname: '/phones/[id]',
          query: getPhoneRoute(product.phoneId),
        }}
      >
        <Image
          className={productStyles.card__img}
          src={`/${product.image}`}
          alt={product.name}
          width={208}
          height={196}
        />
      </Link>

      <h2 className={`${productStyles.card__title} ${typography.bodyText}`}>
        {`${product.name} (iMT9G2FS/A)`}
      </h2>

      <p className={productStyles.card__price}>
        <span
          className={`${productStyles.card__priceСurrent} ${typography.h3}`}
        >
          {`$${product.price}`}
        </span>

        <span className={`${productStyles.card__priceFull} ${typography.h3}`}>
          {`$${product.fullPrice}`}
        </span>
      </p>

      <div className={productStyles.card__features}>
        <p className={productStyles.card__feature}>
          <span
            className={`${productStyles.card__featureName} ${typography.smallText}`}
          >
            Screen
          </span>

          <span
            className={`${productStyles.card__featureValue} ${typography.smallText}`}
          >
            {product.screen}
          </span>
        </p>

        <p className={productStyles.card__feature}>
          <span className={productStyles.card__featureName}>Capacity</span>

          <span className={productStyles.card__featureValue}>
            {product.capacity}
          </span>
        </p>

        <p className={productStyles.card__feature}>
          <span className={productStyles.card__featureName}>RAM</span>

          <span className={productStyles.card__featureValue}>
            {product.ram}
          </span>
        </p>
      </div>

      <div className={productStyles.card__buy}>
        <button
          onClick={() => {
            setAdded(!added);
          }}
          className={classNames(`${productStyles.card__addToCart}`, 'buttons', {
            card__addToCartActive: added,
          })}
        >
          {added ? 'Added' : 'Add to cart'}
        </button>

        <button
          onClick={() => {
            setFavorite(!favorite);
          }}
          className={classNames(`${productStyles.card__favoritesIcon}`, {
            card__favoritesIconActive: favorite,
          })}
        ></button>
      </div>
    </div>
  );
};
