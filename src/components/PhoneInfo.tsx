import { PhoneDetails } from '@prisma/client';
import { useRouter } from 'next/router';
import { FC, MouseEvent, useEffect, useState } from 'react';
import typography from '../styles/Typography.module.css';
import infoStyles from '../styles/PhoneInfo.module.css';
import buttons from '../styles/Buttons.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { PhotoGalery } from './PhotoGalery';
import { Breedcrumbs } from './Breedcrumbs';
import { getIphoneColor } from '../utils/utilities';
import { TechSpecs } from './TechSpecs';
import { PhoneInfoAbout } from './PhoneInfoAbout';
import { CartButton } from './CartButton';
import { FavouriteButton } from './FavouriteButton';

type Props = {
  phones: PhoneDetails[];
};

const PhoneInfo: FC<Props> = ({ phones }) => {
  const router = useRouter();
  const [_, selectedCapacity, selectedColor] = Object.values(
    router.query,
  ) as string[];
  const [selectPhone, setSelectedPhone] = useState<PhoneDetails | null>(null);
  const capacities = phones[0].capacityAvailable;
  const colors = phones[0].colorsAvailable;
  const onSelectCapacity = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.target) {
      router.replace({
        query: { ...router.query, capacity: event.currentTarget.value },
      });
    }
  };
  const onSelectColor = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.target) {
      router.replace({
        query: { ...router.query, color: event.currentTarget.value },
      });
    }
  };
  useEffect(() => {
    const selectedPhone =
      phones.find((phone) => {
        if (selectedCapacity && selectedColor) {
          return (
            phone.capacity === selectedCapacity.toUpperCase() &&
            phone.color === selectedColor
          );
        }
      }) || null;
    if (selectedPhone) {
      setSelectedPhone(selectedPhone);
    }
  }, [phones, selectedCapacity, selectedColor]);

  return (
    <div className={infoStyles.block}>
      {selectPhone && <Breedcrumbs name={selectPhone.name} />}
      <Link
        href="/phones"
        className={classNames(infoStyles.linkBack, typography.smallText)}
      >
        Back
      </Link>
      <h1 className={classNames(typography.h2, infoStyles.name)}>
        {selectPhone?.name}
      </h1>
      <div className={infoStyles.infoContainer}>
        <div className={infoStyles.infoComponentLeft}>
          {selectPhone && <PhotoGalery photos={selectPhone.images} />}
        </div>
        <div className={infoStyles.infoComponentRight}>
          <div className={infoStyles.colorsTitle}>
            <p>Availible colors</p>
            <p>556655</p>
          </div>
          <div className={infoStyles.buttonGroup}>
            {colors.map((col) => (
              <button
                key={col}
                value={col}
                onClick={onSelectColor}
                className={classNames(
                  infoStyles.colorButton,
                  router.query.color === col ? infoStyles.buttonSelected : null,
                )}
                style={{ backgroundColor: getIphoneColor(col) }}
              ></button>
            ))}
          </div>
          <div className={infoStyles.divider}></div>
          <div>
            <h1 className={infoStyles.capacityTitle}>Capacity</h1>
            <div className={infoStyles.buttonGroup}>
              {capacities.map((cap) => (
                <button
                  className={classNames(
                    infoStyles.capacityButton,
                    router.query.capacity === cap
                      ? infoStyles.buttonSelected
                      : null,
                  )}
                  key={cap}
                  value={cap}
                  onClick={onSelectCapacity}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>
          <div className={infoStyles.divider}></div>
          <div className={infoStyles.priceBlock}>
            <div className={typography.h2}>
              {`$${selectPhone?.priceDiscount}`}
            </div>
            <div className={infoStyles.discountPrice}>
              {`$${selectPhone?.priceRegular}`}
            </div>
          </div>
          {selectPhone && (
            <div className={infoStyles.cartButtonGroup}>
              <CartButton id={selectPhone?.id} />
              <FavouriteButton id={selectPhone?.id} />
            </div>
          )}

          <div>
            <ul className={infoStyles.specList}>
              <li className={infoStyles.listItem}>
                <p
                  className={classNames(
                    typography.smallText,
                    infoStyles.grayText,
                  )}
                >
                  Screen
                </p>
                <p className={typography.smallText}>{selectPhone?.screen}</p>
              </li>
              <li className={infoStyles.listItem}>
                <p
                  className={classNames(
                    typography.smallText,
                    infoStyles.grayText,
                  )}
                >
                  Resolution
                </p>
                <p className={typography.smallText}>
                  {selectPhone?.resolution}
                </p>
              </li>
              <li className={infoStyles.listItem}>
                <p
                  className={classNames(
                    typography.smallText,
                    infoStyles.grayText,
                  )}
                >
                  Processor
                </p>
                <p className={typography.smallText}>{selectPhone?.processor}</p>
              </li>
              <li className={infoStyles.listItem}>
                <p
                  className={classNames(
                    typography.smallText,
                    infoStyles.grayText,
                  )}
                >
                  RAM
                </p>
                <p className={typography.smallText}>{selectPhone?.ram}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={infoStyles.additionalContainer}>
        <div className={infoStyles.about}>
          {selectPhone && <PhoneInfoAbout phone={selectPhone} />}
        </div>
        <div className={infoStyles.specs}>
          {selectPhone && <TechSpecs phone={selectPhone} />}
        </div>
      </div>
    </div>
  );
};

export default PhoneInfo;
