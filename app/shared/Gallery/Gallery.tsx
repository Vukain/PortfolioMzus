import styles from './Gallery.module.sass';

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string }> } };
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
                return <img className={styles.image} key={idx} src={`${item.fields.cloudinary_image[0].url}`} alt={item.fields.title}></img>
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