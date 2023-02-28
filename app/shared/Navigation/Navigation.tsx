"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

import styles from './Navigation.module.sass';

type ButtonData = { name: string, url: string };

export const Navigation: React.FC = () => {

    const pathname = usePathname();
    console.log(pathname)

    const buttonsData: ButtonData[] = [{ name: 'concept', url: '/' }, { name: 'digital', url: '/digital' }, { name: 'animation', url: '/animation' }];

    const buttonsList = buttonsData.map((item, index) => (
        <Link href={`${item.url}`} key={index + item.name} className={clsx(styles.link, item.url === pathname && styles.active)}>
            <div className={styles.text}>{item.name}</div>
        </Link>
    ));

    return (
        <nav className={styles.navigation}>
            {buttonsList}
        </nav>
    );
};