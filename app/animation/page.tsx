

import { Gallery } from '../shared/Gallery/Gallery';
import { fetchEntries } from '../utils/fetchData'

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string }> } };
type CloudinaryVideo = { fields: { title: string, link: string } };
type ContentfulImages = { title: string, content: Array<CloudinaryImage> };
type ContentfulVideos = { title: string, content: Array<CloudinaryVideo> };

type fetchedData = {
    concepts: ContentfulImages,
    digital: ContentfulImages,
    animations: ContentfulVideos
};

const Animation = async () => {

    const fetchedEntries = await fetchEntries() as fetchedData;

    return (
        <main>
            <Gallery data={fetchedEntries.animations} />
        </main>
    )
}

export default Animation;

export const revalidate = 900;
