import { clsx } from 'clsx';

import styles from './Carousel.module.sass';

import { CarouselControls } from '../CarouselControls/CarouselControls';

type Props = {
    images: Array<CloudinaryImage>,
    currentImage: number,
    setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
    setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>
}

export const Carousel: React.FC<Props> = ({ images, currentImage, setCurrentImage, setShowCarousel }) => {

    const carouselControl = (action: string) => {

        if (action === 'forward') {
            if (currentImage < images.length - 1) {
                setCurrentImage((prevState) => { return (prevState + 1) });
            };
        } else if (action === 'backward') {
            if (currentImage > 0) {
                setCurrentImage((prevState) => { return (prevState - 1) });
            };
        } else if (action === 'close') {
            setShowCarousel(false);
        };
    };

    const carouselImages = images.map((item, index) => {

        const { url, format, version, public_id } = item.fields.cloudinary_image[0];
        const getAccount = url.match('.com/(.*)/image');
        const account = getAccount ? getAccount[1] : null;

        return <div className={styles.wrapper} key={index}>
            <img
                className={styles.image}
                loading='eager'
                src={`${url}`}
                alt={item.fields.title} />
        </div>
    })

    return (
        <article className={styles.carousel}>
            <div className={styles.slider} style={{ transform: `translateX(${-currentImage * 110}vw)` }}>
                {carouselImages}
            </div>

            <CarouselControls mode='standard' currentImage={currentImage} length={images.length} carouselControl={carouselControl} />

            <div className={styles.counter}> {currentImage + 1}/{images.length}</div>
        </article>
    );
};