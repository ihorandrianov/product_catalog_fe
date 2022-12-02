import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import strokeRight from '../../public/icons/Stroke-right.svg';
import home from '../../public/icons/Home.svg';
import styles from '../styles/Breedcrumbs.module.css';

type Props = {
  name?: string | undefined;
};

export const Breedcrumbs: FC<Props> = ({ name = '' }) => {
  const router = useRouter();
  const locations = router.route.split('/').slice(1);
  return (
    <ul className={styles.list}>
      <li>
        <Link className={styles.listItem} href="/">
          <Image src={home} alt="home icon" width={16} height={16} />
        </Link>
      </li>
      {locations[0] !== '' &&
        locations.map((location, index) => {
          if (location === '[id]') {
            location = name;
          }
          return (
            <li key={location}>
              <Image
                className={styles.stroke}
                src={strokeRight}
                alt="stroke"
                width={6}
                height={10}
              />
              <Link
                className={styles.link}
                href={`/${locations[index + 1] ? location : router.asPath}`}
              >
                {location}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
