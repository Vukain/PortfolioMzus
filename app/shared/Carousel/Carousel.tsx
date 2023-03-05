import { clsx } from 'clsx';

import styles from './Carousel.module.sass';

type MyProps = {
    images: Array<CloudinaryImage>,
    currentImage: number,
    setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
    setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>
}

export const Carousel: React.FC<MyProps> = ({ images, currentImage, setCurrentImage, setShowCarousel }) => {

    const carouselControl = (action: string) => {

        if (action === 'forward') {
            if (currentImage < images.length - 1) {
                setCurrentImage((prevState) => { return (prevState + 1) });
            } else {
                // setCurrentImage(0);
            };
        } else if (action === 'backward') {
            if (currentImage > 0) {
                setCurrentImage((prevState) => { return (prevState - 1) });
            } else {
                // setCurrentImage(images.length - 1);
            };
        } else if (action === 'close') {
            setShowCarousel(false);
        }
    };

    const carouselImages = images.map((item, index) => {

        const { url, format, version, public_id } = item.fields.cloudinary_image[0];
        const getAccount = url.match('.com/(.*)/image');
        const account = getAccount ? getAccount[1] : null;

        return <div className={styles.wrapper} key={index}>
            <img onClick={() => { setCurrentImage(currentImage + 1) }}
                className={styles.image}
                loading='eager'
                src={`${url}`}
                alt={item.fields.title} />
        </div>
    })

    return (
        <article className={styles.carousel}>
            <div className={styles.slider} style={{ transform: `translateX(${-currentImage * 100}vw)` }}>
                {carouselImages}
            </div>
            <div className={styles.controls}>
                <div className={styles.next} >
                    <figure className={styles.next_icon} onClick={() => { carouselControl('forward') }} />
                </div>
                <div className={styles.previous} >
                    <figure className={styles.previous_icon} onClick={() => { carouselControl('backward') }} />
                </div>
                <div className={styles.close}>
                    <figure className={styles.close_icon} onClick={() => { carouselControl('close') }} />
                </div>
            </div>
        </article>
    );
};