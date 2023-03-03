"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { motion } from "framer-motion";

import styles from './Gallery.module.sass';
import { PageTransition } from '../PageTransition/PageTransition';

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string, format: string, version: number, public_id: string }> } };
type CloudinaryVideo = { fields: { title: string, link: string } };
type ImageOrVideo = CloudinaryImage | CloudinaryVideo;
type MyProps = { data: { title: string, content: Array<ImageOrVideo> }, columns?: number }

export const Gallery: React.FC<MyProps> = ({ data, columns = 3 }) => {

    const [isMasonryEnabled, setIsMasonryEnabled] = useState(true);
    const isDesktopRef = useRef(true);

    const useConditionalLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    useConditionalLayoutEffect(() => {
        handleLayoutChange();

        window.addEventListener('resize', handleLayoutChange);
        return () => window.removeEventListener('resize', handleLayoutChange);
    }, [])

    const handleLayoutChange = () => {
        if (window.matchMedia('(orientation: landscape)').matches && !isDesktopRef.current) {
            isDesktopRef.current = true;
            setIsMasonryEnabled(true);
        } else if (window.matchMedia('(orientation: portrait)').matches && isDesktopRef.current) {
            isDesktopRef.current = false;
            setIsMasonryEnabled(false);
        };
    };

    const determineImagesOrVideos = (toBeDetermined: ImageOrVideo): toBeDetermined is CloudinaryImage => {
        if ((toBeDetermined as CloudinaryImage).fields.cloudinary_image) {
            return true;
        };
        return false;
    };

    const splitIntoChunks = (chunks: number, initialList: ImageOrVideo[]) => {
        const newList: Array<ImageOrVideo[]> = [];

        for (let i = 0; i < chunks; i++) {

            const partialList: ImageOrVideo[] = [];

            for (let j = i; j < initialList.length; j = j + chunks) {
                partialList.push(initialList[j]);
            };

            newList.push(partialList);
        };

        return newList;
    };

    // const variants = {
    //     hidden: { opacity: 1 },
    //     show: {
    //         opacity: 1,
    //         transition: {
    //             delay: .5,
    //             staggerChildren: 0.3,
    //             ease: 'easeInOut'
    //         },
    //     },
    // };

    // const images = {
    //     hidden: {
    //         opacity: 0,
    //         y: 20,
    //     },
    //     show: {
    //         opacity: 1,
    //         y: 0,
    //         transition: {
    //             duration: .8,
    //         },
    //     },
    // };

    const generateImage = (item: CloudinaryImage, index: number) => {
        const { url, format, version, public_id } = item.fields.cloudinary_image[0];

        const getAccount = url.match('.com/(.*)/image');
        const account = getAccount ? getAccount[1] : null;

        return <img
            className={styles.image}
            key={index}
            loading='lazy'
            srcSet={`https://res.cloudinary.com/${account}/image/upload/w_${600}/f_auto/q_auto:best/v${version}/${public_id}.${format} 600w,
                    https://res.cloudinary.com/${account}/image/upload/w_${800}/f_auto/q_auto:best/v${version}/${public_id}.${format} 800w,
                    https://res.cloudinary.com/${account}/image/upload/w_${1200}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1200w, 
                    https://res.cloudinary.com/${account}/image/upload/w_${1600}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1600w, 
                    https://res.cloudinary.com/${account}/image/upload/w_${2000}/f_auto/q_auto:best/v${version}/${public_id}.${format} 2000w`}
            src={`https://res.cloudinary.com/${account}/image/upload/f_auto/q_auto:best/v${version}/${public_id}.${format}`}
            sizes={'(orientation: portrait) 90vw, 30vw'}
            alt={item.fields.title} />
    };

    const generateVideo = (item: CloudinaryVideo, index: number) => {
        return <iframe
            frameBorder="0"
            className={styles.video}
            key={index}
            src={`${item.fields.link}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
        />
    }

    let content;

    if (data.content.length > 0) {

        if (columns > 1 && isMasonryEnabled) {
            content = splitIntoChunks(columns, data.content).map((chunk, index) => {

                const column = chunk.map((item: ImageOrVideo, index: number) => {
                    if (determineImagesOrVideos(item)) {
                        return generateImage(item, index);
                    } else {
                        return generateVideo(item, index);
                    }
                });

                return <div key={index} className={styles.masonry_column}>{column}</div>

            })
        } else {
            content = data.content.map((item: ImageOrVideo, index: number) => {
                if (determineImagesOrVideos(item)) {
                    return generateImage(item, index);
                } else {
                    return generateVideo(item, index);
                }
            });
        };
    } else {
        content = 'no content to display';
    };

    return (

        <PageTransition>
            <div className={styles.gallery}>
                {content}
            </div>
        </PageTransition>
    );
}