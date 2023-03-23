import { useEffect, useReducer, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { calcLength, useReducedMotion } from 'framer-motion';

import styles from './InfiniteCarousel.module.sass';

type MyProps = {
    images: Array<CloudinaryImage>,
    currentImage: number,
    setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
    setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>
};

export const InfiniteCarousel: React.FC<MyProps> = ({ images, currentImage, setCurrentImage, setShowCarousel }) => {

    const [transitionDuration, setTransitionDuration] = useState(useReducedMotion() ? 0 : 700);
    const sliderRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const throttle = useRef(false);

    const motionNotReduced = !useReducedMotion();

    const throttleTransition = () => {
        throttle.current = true;
        setTimeout(() => {
            throttle.current = false;
        }, transitionDuration + 50);
    };

    // Looping with the usage of 'transitionend' listener
    // useEffect(() => {
    //     if (motionNotReduced) {
    //         const loopCarousel = (event: TransitionEvent) => {

    //             // If event listener would be set on window, instead of slider
    //             // const sliderAsTarget = 'className' in event.target! && (event.target.className as string).includes('slider');

    //             if (event.propertyName === 'transform') {

    //                 if (currentImage > images.length - 1) {
    //                     setTransitionDuration(0);
    //                     setCurrentImage(0);
    //                 } else if (currentImage < 0) {
    //                     setTransitionDuration(0);
    //                     setCurrentImage(images.length - 1);
    //                 };

    //                 setTimeout(() => {
    //                     setTransitionDuration(700);
    //                 }, 50);
    //             };
    //         };

    //         sliderRef.current!.addEventListener("transitionend", loopCarousel)

    //         return () => {
    //             sliderRef.current!.removeEventListener("transitionend", loopCarousel)
    //         };

    //     } else {
    //         if (currentImage > images.length - 1) {
    //             setCurrentImage(0);
    //         } else if (currentImage < 0) {
    //             setCurrentImage(images.length - 1);
    //         };
    //     };

    // }, [currentImage]);

    // const carouselControl = (action: string) => {

    //     if (action === 'forward') {

    //         if (currentImage > images.length - 1) {
    //             throttleTransition();
    //         };
    //         !throttle.current && setCurrentImage((prevState) => { return (prevState + 1) });

    //     } else if (action === 'backward') {

    //         if (currentImage < 0) {
    //             throttleTransition();
    //         };
    //         !throttle.current && setCurrentImage((prevState) => { return (prevState - 1) });

    //     } else if (action === 'close') {
    //         setShowCarousel(false);
    //     };
    // };

    // Looping using fixed delays
    const loopJump = (jumpLocation: number) => {
        setTimeout(() => {
            setTransitionDuration(0);
            setCurrentImage(jumpLocation);
            setTimeout(() => {
                setTransitionDuration(700);
            }, 50);
        }, transitionDuration)
    };

    const carouselControl = (action: string) => {

        if (action === 'close') {
            setShowCarousel(false)
        } else if (action === 'forward' && !throttle.current) {
            if (currentImage > images.length - 2) {
                setCurrentImage((prevState) => { return (prevState + 1) });
                throttleTransition();
                loopJump(0);
            } else {
                setCurrentImage((prevState) => { return (prevState + 1) })
            }
        } else if (action === 'backward' && !throttle.current)
            if (currentImage < 1) {
                setCurrentImage((prevState) => { return (prevState - 1) });
                throttleTransition();
                loopJump(images.length - 1);
            } else {
                setCurrentImage((prevState) => { return (prevState - 1) })
            }

        if (motionNotReduced) {
            setTimeout(() => {
                setTransitionDuration(700);
            }, 50);
        };
    };

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
    })

    let displayCurrent;

    if (currentImage + 1 > images.length) {
        displayCurrent = 1;
    } else if (currentImage < 0) {
        displayCurrent = images.length;
    } else {
        displayCurrent = currentImage + 1;
    };

    return (
        <article className={styles.carousel}>
            <div className={styles.slider} ref={sliderRef} style={{ transform: `translateX(${(-currentImage * 110) - 110}vw)`, transition: `transform ${transitionDuration}ms ease-in-out` }}>
                {carouselImages}
            </div>
            <button className={styles.next} onClick={() => { carouselControl('forward') }}>
                <figure className={styles.next_icon} />
            </button>
            <button className={styles.previous} onClick={() => { carouselControl('backward') }}>
                <figure className={styles.previous_icon} />
            </button>
            <button className={styles.close} onClick={() => { carouselControl('close') }}>
                <figure className={styles.close_icon} />
            </button>
            <div className={styles.counter}> {displayCurrent}/{images.length}</div>
        </article>
    );
};