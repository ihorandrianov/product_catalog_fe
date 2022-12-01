import styles from '../styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/icons/Logo.svg';
import { FC } from 'react';
import footerButton from '../../public/icons/FooterButton.svg';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Image
        className={styles.logo}
        src={logo}
        alt="Logo"
      />
      <div className={styles.footer_inside}>
        <Link href='https://github.com/fe-aug22-dream-team/product_catalog_fe' className={styles.footer_links}>GITHUB</Link>
        <Link href='/contacts' className={styles.footer_links}>CONTACTS</Link>
        <Link href='/rights' className={styles.footer_links}>RIGHTS</Link>
      </div>
      <div className={styles.footer_button_container}>
        <p className={styles.footer_back_link}>Back to top</p>
        <button 
          type='button' 
          className={styles.footer_button}
        >
          <Link href="#header">
            <Image 
              src={footerButton}
              className={styles.footer_button_image}
              alt='Image for footer button'
            /> 
          </Link>
        </button>
      </div>
    </footer>
  );
}