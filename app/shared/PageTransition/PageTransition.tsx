"use client";

import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './PageTransition.module.sass';

type Children = {
    children: React.ReactNode;
}

export const PageTransition = ({ children }: Children) => {

    // const { pathname } = useRouter();
    const pathname = usePathname();
    console.log(pathname)

    const variants = {
        initial: {
            opacity: 0,
            y: 40
        },
        out: {
            // opacity: 0,
            // y: 40,
            // transition: {
            //     duration: .7
            // }
        },
        in: {
            opacity: 1,
            y: 0,
            transition: {
                duration: .9,
                delay: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    return <div className={styles.effect}>
        <AnimatePresence initial={true} mode='sync'>
            <motion.div
                className={styles.effect2}
                key={pathname}
                variants={variants}
                animate="in"
                initial="initial"
                exit="out"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    </div >
};