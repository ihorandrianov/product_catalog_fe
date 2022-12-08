import Image from 'next/image';
import category_phones from '../../public/img/category_phones.svg';
import category_tablets from '../../public/img/category_tablets.svg';
import category_accessories from '../../public/img/category_accessories.svg';
import styles from '../styles/ShopByCategory.module.css';
import Link from 'next/link';

export default function ShopByCategory() {
    return (
        <section className={styles.category}>
        <h2 className={styles.subtitle}>Shop by category</h2>
        <div className={styles.box}>
            <div className={styles.content}>
                <Image className={styles.img} src={category_phones} alt="Phones" />
                <Link href="/phones" className={styles.link}>
                    Mobile phones
                </Link>
                <p className={styles.calc}>95 models</p>
            </div>
            <div className={styles.content}>
                <Image className={styles.img} src={category_tablets} alt="Tablets" />
                <Link href="/tablets" className={styles.link}>
                    Tablets
                </Link>
                <p className={styles.calc}>24 models</p>
            </div>
            <div className={styles.content}>
                <Image className={styles.img} src={category_accessories} alt="Accessories" />
                <Link href="/accessories" className={styles.link}>
                    Accessories
                </Link>
                <p className={styles.calc}>100 models</p>
            </div>
        </div>
        </section>
    )
}
