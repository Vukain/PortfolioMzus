"use client";

import styles from './VideoGallery.module.sass';

import { determineImageOrVideo } from '@/utils/determineImageOrVIdeo';

import { PageTransition } from '../PageTransition/PageTransition';

type MyProps = { videos: ContentfulVideos }

export const VideoGallery: React.FC<MyProps> = ({ videos }) => {

    const generateVideo = (item: CloudinaryVideo, index: number) => {
        return <iframe
            frameBorder="0"
            className={styles.video}
            key={index}
            src={`${item.fields.link}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
        />
    };

    const content = videos.content.length > 0 ?
        (videos.content.map((item: ImageOrVideo, index: number) => {
            if (!determineImageOrVideo(item)) {
                return generateVideo(item, index);
            };
        })) :
        'No content to display!'

    return (
        <>
            <PageTransition>
                <div className={styles.gallery}>
                    {content}
                </div>
            </PageTransition>
        </>
    );
}