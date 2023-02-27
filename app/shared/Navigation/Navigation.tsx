"use client"
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import styles from './Navigation.module.sass';

type ButtonData = { name: string, url: string };

export const Navigation: React.FC = () => {

    const pathname = usePathname();
    // console.log(pathname)

    const buttonsData: ButtonData[] = [{ name: 'concepts', url: '' }, { name: 'digital', url: 'digital' }, { name: 'animation', url: 'animation' }];

    const buttonsList = buttonsData.map((item, index) => (<Link href={`${item.url}`} key={index + item.name} className={styles.button}>{item.name}</Link>));

    return (
        <nav className={styles.navigation}>
            {buttonsList}
        </nav>
    );
};