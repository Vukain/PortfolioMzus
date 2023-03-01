import { Gallery } from '../shared/Gallery/Gallery';
import { fetchEntries } from '../utils/fetchData'

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string, format: string, version: number, public_id: string, }> } };
type CloudinaryVideo = { fields: { title: string, link: string } };
type ContentfulImages = { title: string, content: Array<CloudinaryImage> };
type ContentfulVideos = { title: string, content: Array<CloudinaryVideo> };

type fetchedData = {
    concepts: ContentfulImages,
    digital: ContentfulImages,
    animations: ContentfulVideos
};

const Digital = async () => {

    const fetchedEntries = await fetchEntries() as fetchedData;

    return (
        <main>
            <Gallery data={fetchedEntries.digital} columns={4} />
        </main>
    )
}

export default Digital;

export const revalidate = 900;
