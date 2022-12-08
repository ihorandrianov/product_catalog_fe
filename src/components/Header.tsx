import styles from '../styles/Header.module.css';
import Image from 'next/image';
import Logo from '../../public/img/header_img/Logo.svg';
import Fav from '../../public/img/header_img/favourites.svg';
import Shopping from '../../public/img/header_img/shopping.svg';
import Close from '../../public/img/header_img/close.svg';
import Open from '../../public/img/header_img/menu.svg';
import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logOut = () => {
    signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  const logIn = () => {
    signIn('github')
      .then((value) => console.log(value))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {isOpen && (
        <div className={styles.menu__page}>
          <div className={styles.header__menu}>
            <Link href="#home" className={styles.link__img}>
              <Image className={styles.img__logo} src={Logo} alt="Logo" />
            </Link>
            <div className={styles.menu}>
              <button onClick={closeMenu} className={styles.link__nav}>
                <Image className={styles.img} src={Close} alt="shopping" />
              </button>
            </div>
          </div>
          <div className={styles.content__nav__menu}>
            <ul className={styles.list__menu}>
              <li className={styles.list__item}>
                <Link href="/" className={styles.list__link}>
                  home
                </Link>
              </li>

              <li className={styles.list__item}>
                <Link href="/phones" className={styles.list__link}>
                  phones
                </Link>
              </li>

              <li className={styles.list__item}>
                <Link href="/tablets" className={styles.list__link}>
                  tablets
                </Link>
              </li>

              <li className={styles.list__item}>
                <Link href="/accessories" className={styles.list__link}>
                  accessories
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.content__link__menu}>
            <Link href="/favourites" className={styles.link__nav__menu}>
              <Image className={styles.img} src={Fav} alt="favourites" />
            </Link>
            <Link href="/cart" className={styles.link__nav__menu}>
              <Image className={styles.img} src={Shopping} alt="shopping" />
            </Link>
          </div>
        </div>
      )}

      <header id="header" className={styles.header}>
        <Link href="/" className={styles.link__img}>
          <Image className={styles.img__logo} src={Logo} alt="Logo" />
        </Link>

        <div className={styles.content__nav}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <Link href="/" className={styles.list__link}>
                home
              </Link>
            </li>

            <li className={styles.list__item}>
              <Link href="/phones" className={styles.list__link}>
                phones
              </Link>
            </li>

            <li className={styles.list__item}>
              <Link href="/tablets" className={styles.list__link}>
                tablets
              </Link>
            </li>

            <li className={styles.list__item}>
              <Link href="/accessories" className={styles.list__link}>
                accessories
              </Link>
            </li>
          </ul>
        </div>
        {session ? (
          <div className={styles.content__link}>
            <Link href="/favourites" className={styles.link__nav}>
              <Image className={styles.img} src={Fav} alt="favourites" />
            </Link>
            <Link href="/cart" className={styles.link__nav}>
              <Image className={styles.img} src={Shopping} alt="shopping" />
            </Link>
            <button
              style={{ marginRight: '10px' }}
              onClick={() => logOut()}
              className={styles.list__link}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.content__link}>
            <button
              style={{ marginRight: '10px' }}
              onClick={() => logIn()}
              className={styles.list__link}
            >
              Sign in
            </button>
          </div>
        )}

        <div className={styles.menu}>
          {session ? (
            <button onClick={openMenu} className={styles.link__nav}>
              <Image className={styles.img} src={Open} alt="menu-opener" />
            </button>
          ) : (
            <button
              style={{ marginRight: '10px' }}
              onClick={() => signIn()}
              className={styles.list__link}
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </>
  );
}
