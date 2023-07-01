'use client';

import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

import { motion, AnimatePresence, useReducedMotion, MotionConfig } from 'framer-motion';

import styles from './PageTransition.module.sass';

type Children = {
  children: React.ReactNode;
};

export const PageTransition = ({ children }: Children) => {
  // const { pathname } = useRouter();
  const pathname = usePathname();
  // const prefersReducedMotion = useReducedMotion()

  const variants = {
    initial: {
      opacity: 0,
      y: '3vh',
    },
    out: {
      opacity: 0,
      y: '3vh',
      transition: {
        duration: 0.6,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <MotionConfig reducedMotion={'user'}>
        <AnimatePresence initial={true} mode="wait">
          <motion.div key={pathname} variants={variants} animate="in" initial="initial" exit="out">
            {children}
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};
