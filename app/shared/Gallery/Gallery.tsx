import styles from './Gallery.module.sass';

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string, format: string, version: number, public_id: string }> } };
type CloudinaryVideo = { fields: { title: string, link: string } };
type ImageOrVideo = CloudinaryImage | CloudinaryVideo;

type MyProps = { data: { title: string, content: Array<ImageOrVideo> } }

export const Gallery: React.FC<MyProps> = ({ data }) => {

    function determineIfIsImagesOrVideos(toBeDetermined: ImageOrVideo): toBeDetermined is CloudinaryImage {
        if ((toBeDetermined as CloudinaryImage).fields.cloudinary_image) {
            return true
        }
        return false
    }

    let content;

    if (data.content.length > 0) {

        content = data.content.map((item: ImageOrVideo, idx: number) => {
            if (determineIfIsImagesOrVideos(item)) {

                const { url, format, version, public_id } = item.fields.cloudinary_image[0];

                const getAccount = url.match('.com/(.*)/image');
                const account = getAccount ? getAccount[1] : null;

                // https://res.cloudinary.com/dish9tuwh/image/upload/w_600/f_auto/q_auto:best/v1677510121/mzus/4_wth2i6.webp
                // `https://res.cloudinary.com/${account}/image/upload/w_${}/f_auto/q_auto:best/v${version}/${public_id}.${format}`

                return <img
                    className={styles.image}
                    key={idx}
                    loading='lazy'
                    srcSet={`https://res.cloudinary.com/${account}/image/upload/w_${800}/f_auto/q_auto:best/v${version}/${public_id}.${format} 800w,
                        https://res.cloudinary.com/${account}/image/upload/w_${1200}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1200w, 
                        https://res.cloudinary.com/${account}/image/upload/w_${1600}/f_auto/q_auto:best/v${version}/${public_id}.${format} 1600w, 
                        https://res.cloudinary.com/${account}/image/upload/w_${2000}/f_auto/q_auto:best/v${version}/${public_id}.${format} 2000w`}
                    src={`https://res.cloudinary.com/${account}/image/upload/f_auto/q_auto:best/v${version}/${public_id}.${format}`}
                    sizes={'40vw'}
                    alt={item.fields.title}></img>

            } else {
                return <iframe
                    key={idx}
                    width="560"
                    height="315"
                    src={`${item.fields.link}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            }
        })

    } else {
        content = 'no content to display'
    };

    return (
        <section className={styles.gallery}>
            {content}
        </section>
    );
}