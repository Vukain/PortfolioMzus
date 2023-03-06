"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { clsx } from 'clsx';

import styles from './ImageGallery.module.sass';

import { determineImageOrVideo } from '@/app/utils/determineImageOrVIdeo';

import { PageTransition } from '../PageTransition/PageTransition';
import { Carousel } from '../Carousel/Carousel';

type ChunkedImages = { initialIndex: number, element: CloudinaryImage };

type MyProps = { images: ContentfulImages, columns?: number }

export const ImageGallery: React.FC<MyProps> = ({ images, columns = 3 }) => {

    const [currentImage, setCurrentImage] = useState(0);
    const [showCarousel, setShowCarousel] = useState(false);
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

    const splitIntoChunks = (chunks: number, initialList: CloudinaryImage[]) => {
        const newList: Array<ChunkedImages[]> = [];

        for (let i = 0; i < chunks; i++) {

            const partialList: ChunkedImages[] = [];

            for (let j = i; j < initialList.length; j = j + chunks) {
                partialList.push({ initialIndex: j, element: initialList[j] });
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

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        // console.log(index);
        setCurrentImage(index);
        setShowCarousel(true);
    };

    const generateImage = (item: CloudinaryImage, index: number) => {
        const { url, format, version, public_id } = item.fields.cloudinary_image[0];

        const getAccount = url.match('.com/(.*)/image');
        const account = getAccount ? getAccount[1] : null;

        return <div className={styles.wrapper} key={index} onClick={(e) => onClickHandler(e, index)}>
            <img
                className={styles.image}
                loading='lazy'
                srcSet={`https://res.cloudinary.com/${account}/image/upload/w_${600}/f_auto/q_auto:best/v${version}/${public_id}.${format} 600w,
                    https://res.cloudinary.com/${account}/image/upload/w_${800}/f_auto/q_auto:best/v${version}/${public_id}.${format} 800w,
                    https://res.cloudinary.com/${account}/image/upload/w_${1200}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1200w, 
                    https://res.cloudinary.com/${account}/image/upload/w_${1600}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1600w, 
                    https://res.cloudinary.com/${account}/image/upload/w_${2000}/f_auto/q_auto:best/v${version}/${public_id}.${format} 2000w`}
                src={`https://res.cloudinary.com/${account}/image/upload/f_auto/q_auto:best/v${version}/${public_id}.${format}`}
                sizes={'(orientation: portrait) 90vw, 30vw'}
                alt={item.fields.title} />
        </div>
    };

    const carouselImages = images.content.filter((item) => {
        return determineImageOrVideo(item);
    });

    let content;

    if (images.content.length > 0) {

        if (columns > 1 && isMasonryEnabled) {
            content = splitIntoChunks(columns, images.content).map((chunk, index) => {

                const column = chunk.map((item: ChunkedImages) => {
                    if (determineImageOrVideo(item.element)) {
                        return generateImage(item.element, item.initialIndex);
                    };
                });

                return <div key={index} className={styles.masonry_column}>{column}</div>

            })
        } else {
            content = images.content.map((item: ImageOrVideo, index: number) => {
                if (determineImageOrVideo(item)) {
                    return generateImage(item, index);
                }
            });
        };
    } else {
        content = 'No content to display!';
    };

    return (
        <>
            <PageTransition>
                <div className={styles.gallery}>
                    {content}
                </div>
            </PageTransition>
            {showCarousel && <Carousel images={carouselImages} currentImage={currentImage} setCurrentImage={setCurrentImage} setShowCarousel={setShowCarousel} />}
        </>
    );
}