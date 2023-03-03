"use client";

import { motion, AnimatePresence } from 'framer-motion';

type Children = {
    children: React.ReactNode;
}

export const PageTransition = ({ children }: Children) => {

    const variants = {
        out: {
            opacity: 0,
            y: 40,
            transition: {
                duration: .7
            }
        },
        in: {
            opacity: 1,
            y: 0,
            transition: {
                duration: .7,
                delay: 0.5
            }
        }
    };

    return <div className="effect-1">
        <AnimatePresence initial={true} mode='wait'>
            <motion.div initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}>
                {children}
            </motion.div>
        </AnimatePresence>
    </div>
};