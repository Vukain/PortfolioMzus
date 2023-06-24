"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { clsx } from 'clsx';

import styles from './ImageGallery.module.sass';

import { determineImageOrVideo } from '@/utils/determineImageOrVIdeo';
import { splitIntoChunks } from '@/utils/splitIntoChunks';
import { PageTransition } from '../PageTransition/PageTransition';
import { InfiniteCarousel } from '../Carousel/InfiniteCarousel/InfiniteCarousel';

type Props = { images: ContentfulImages, columns?: number }

export const ImageGallery: React.FC<Props> = ({ images, columns = 3 }) => {

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

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
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

    const generateContent = () => {
        if (images.content.length > 0) {

            if (columns > 1 && isMasonryEnabled) {
                return splitIntoChunks(columns, images.content).map((chunk, index) => {

                    const column = chunk.map((item: ChunkedImages) => {
                        if (determineImageOrVideo(item.element)) {
                            return generateImage(item.element, item.initialIndex);
                        };
                    });

                    return <div key={index} className={styles.masonry_column}>{column}</div>

                })
            } else {
                return images.content.map((item: ImageOrVideo, index: number) => {
                    if (determineImageOrVideo(item)) {
                        return generateImage(item, index);
                    }
                });
            };
        } else {
            return 'No content to display!';
        };
    };

    const carouselImages = images.content.filter((item) => {
        return determineImageOrVideo(item);
    });

    return (
        <>
            <PageTransition>
                <div className={styles.gallery}>
                    {generateContent()}
                </div>
            </PageTransition>
            {showCarousel && <InfiniteCarousel images={carouselImages} currentImage={currentImage} setCurrentImage={setCurrentImage} setShowCarousel={setShowCarousel} />}
        </>
    );
}