import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import strokeRight from '../../public/icons/Stroke-right.svg';
import home from '../../public/icons/Home.svg';
import styles from '../styles/Breedcrumbs.module.css';

export const Breedcrumbs: FC = () => {
  const router = useRouter();
  const locations = router.route.split('/').slice(1);
  console.log(locations);
  return (
    <ul className={styles.list}>
      <li>
        <Link className={styles.listItem} href="/">
          <Image src={home} alt="home icon" width={16} height={16} />
        </Link>
      </li>
      {locations[0] !== '' &&
        locations.map((location) => (
          <li key={location}>
            <Image
              className={styles.stroke}
              src={strokeRight}
              alt="stroke"
              width={6}
              height={10}
            />
            <Link href={`/${location}`}>{location}</Link>
          </li>
        ))}
    </ul>
  );
};
