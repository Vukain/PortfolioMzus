"use client";

import { clsx } from 'clsx';

import styles from './Gallery.module.sass';

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string, format: string, version: number, public_id: string }> } };
type CloudinaryVideo = { fields: { title: string, link: string } };
type ImageOrVideo = CloudinaryImage | CloudinaryVideo;

type MyProps = { data: { title: string, content: Array<ImageOrVideo> }, columns?: number }

export const Gallery: React.FC<MyProps> = ({ data, columns = 3 }) => {

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

    const generateImage = (item: CloudinaryImage, index: number) => {
        const { url, format, version, public_id } = item.fields.cloudinary_image[0];

        const getAccount = url.match('.com/(.*)/image');
        const account = getAccount ? getAccount[1] : null;

        return <img
            className={clsx(styles.image, styles['image--masonry'])}
            key={index}
            loading='lazy'
            srcSet={`https://res.cloudinary.com/${account}/image/upload/w_${800}/f_auto/q_auto:best/v${version}/${public_id}.${format} 800w,
                        https://res.cloudinary.com/${account}/image/upload/w_${1200}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1200w, 
                        https://res.cloudinary.com/${account}/image/upload/w_${1600}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1600w, 
                        https://res.cloudinary.com/${account}/image/upload/w_${2000}/f_auto/q_auto:best/v${version}/${public_id}.${format} 2000w`}
            src={`https://res.cloudinary.com/${account}/image/upload/f_auto/q_auto:best/v${version}/${public_id}.${format}`}
            sizes={'40vw'}
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

        // console.log(splitIntoChunks(3, data.content))

        if (columns > 1 && window.matchMedia('(orientation: landscape)').matches) {
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
        }


    } else {
        content = 'no content to display';
    };

    return (
        <section className={styles.gallery}>
            {content}
        </section>
    );
}