
import { ImageGallery } from '../shared/ImageGallery/ImageGallery';
import { fetchEntries } from '../utils/fetchData'

const Design = async () => {

    const fetchedEntries = await fetchEntries() as FetchedData;

    return (
        <main>
            <ImageGallery images={fetchedEntries.digital} columns={5} />
        </main>
    );
};

export default Design;

export const revalidate = 900;
