
import { ImageGallery } from '../shared/ImageGallery/ImageGallery';
import { fetchEntries } from '../utils/fetchData'

const Illustration = async () => {

    const fetchedEntries = await fetchEntries() as FetchedData;

    return (
        <main>
            <ImageGallery images={fetchedEntries.digital} columns={4} />
        </main>
    );
};

export default Illustration;

export const revalidate = 900;
