import React from "react";
import Link from 'next/link';
import styles from '../styles/TypographyDesktop.module.css'; 
import position from '../styles/404.module.css';
import Image from 'next/image';
import logo from '../../public/icons/Logo.svg';

export default function Custom404() {
    return <>
        <Image
            src={logo}
            alt="Logo"
            className={position.logo}
        />
        <div className={position.position}>
        <h1 className={styles.h1Desktop}>Sorry... This page does not found (404)</h1>
        <Link href="/" className={`${styles.buttons}, ${styles.h3Desktop}`}> 
            Go back home 
        </Link>
        </div>
    </>
}