import { useEffect, useReducer, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { calcLength, useReducedMotion } from 'framer-motion';

import styles from './InfiniteCarousel.module.sass';
import { CarouselControls } from '../CarouselControls/CarouselControls';
// import { useCarouseTransitionListener } from '@/app/hooks/useCarouselTransitionListener';

type Props = {
    images: Array<CloudinaryImage>,
    currentImage: number,
    setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
    setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>
};

export const InfiniteCarousel: React.FC<Props> = ({ images, currentImage, setCurrentImage, setShowCarousel }) => {

    const [transitionDuration, setTransitionDuration] = useState(useReducedMotion() ? 0 : 700);

    const sliderRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const throttle = useRef(false);

    const motionNotReduced = !useReducedMotion();

    const displayCurrent = () => {
        if (currentImage + 1 > images.length) {
            return 1;
        } else if (currentImage < 0) {
            return images.length;
        } else {
            return currentImage + 1;
        };
    };

    const transitionDurationSwitch = () => {
        if (motionNotReduced) {
            setTimeout(() => {
                setTransitionDuration(700);
            }, 50);
        };
    };

    const throttleTransition = () => {
        throttle.current = true;
        setTimeout(() => {
            throttle.current = false;
        }, transitionDuration + 50);
    };

    const loopJump = (jumpLocation: number) => {
        setTimeout(() => {
            setTransitionDuration(0);
            setCurrentImage(jumpLocation);
            transitionDurationSwitch();
        }, transitionDuration)
    };

    const carouselControl = (action: string) => {

        if (action === 'close') {
            setShowCarousel(false)
        } else if (action === 'forward' && !throttle.current) {
            setCurrentImage((prevState) => { return (prevState + 1) });
            if (currentImage > images.length - 2) {
                throttleTransition();
                loopJump(0);
            };
        } else if (action === 'backward' && !throttle.current) {
            setCurrentImage((prevState) => { return (prevState - 1) })
            if (currentImage < 1) {
                throttleTransition();
                loopJump(images.length - 1);
            };
        };

        transitionDurationSwitch();
    };

    // Alternative looping with the usage of 'transitionend' listener
    // useCarouseTransitionListener({ length: images.length, currentImage, motionNotReduced, sliderRef, setCurrentImage, setTransitionDuration, transitionDurationSwitch })

    // const carouselControl = (action: string) => {

    //     if (action === 'forward') {

    //         if (currentImage > images.length - 1) {
    //             throttleTransition();
    //         } else if (!throttle.current) {
    //             setCurrentImage((prevState) => { return (prevState + 1) });
    //         };

    //     } else if (action === 'backward') {

    //         if (currentImage < 0) {
    //             throttleTransition();
    //         } else if (!throttle.current) {
    //             setCurrentImage((prevState) => { return (prevState - 1) });
    //         };

    //     } else if (action === 'close') {
    //         setShowCarousel(false);
    //     };
    // };

    const carouselImages = [images.at(-1), ...images, images.at(0)].map((item, index) => {

        const { url, format, version, public_id } = item!.fields.cloudinary_image[0];
        const getAccount = url.match('.com/(.*)/image');
        const account = getAccount ? getAccount[1] : null;

        return <div className={styles.wrapper} key={index}>
            <img
                className={styles.image}
                loading='eager'
                src={`${url}`}
                alt={item!.fields.title} />
        </div>
    });

    return (
        <article className={styles.carousel}>
            <div className={styles.slider} ref={sliderRef} style={{ transform: `translateX(${(-currentImage * 110) - 110}vw)`, transition: `transform ${transitionDuration}ms ease-in-out` }}>
                {carouselImages}
            </div>

            <CarouselControls mode='infinite' currentImage={currentImage} length={images.length} carouselControl={carouselControl} />

            <div className={styles.counter}> {displayCurrent()}/{images.length}</div>
        </article>
    );
};