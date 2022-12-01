import styles from '../styles/Header.module.css';
import Image from 'next/image';
import Logo from './images/Logo.svg';
import Fav from './images/favourites.svg';
import Shopping from './images/shopping.svg';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content__top}>
            <div className={styles.content__box}>
              <a href="#home" className={styles.content__logo}>
              <Image
                className={styles.logo__img}
                src={Logo}
                alt='Logo'
              />
              </a>
        
              <div className={styles.content__nav}>  
                <ul className={styles.list}>
                  <li className={styles.list__item}>
                    <a href="#home" className={styles.list__link}>
                      home
                    </a>
                  </li>

                  <li className={styles.list__item}>
                    <a href="#phones" className={styles.list__link}>
                      phones
                    </a>
                  </li>

                  <li className={styles.list__item}>
                    <a href="#tablets" className={styles.list__link}>
                      tablets
                    </a>
                  </li>

                  <li className={styles.list__item}>
                    <a href="#accessories" className={styles.list__link}>
                      accessories
                    </a>
                  </li>
                </ul>
              </div>
          </div>
            <div className={styles.content__link}>
              <a href="#favourites" className={styles.link__nav}>
                <Image
                  className={styles.logo__img}
                  src={Fav}
                  alt='favourites'
                />
              </a>
              <a href="#shopping" className={styles.link__nav}>
                <Image
                  className={styles.logo__img}
                  src={Shopping}
                  alt='shopping'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
};
