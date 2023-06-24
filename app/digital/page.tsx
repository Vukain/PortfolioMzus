
import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import { fetchEntries } from '@/utils/fetchData'

const Digital = async () => {

    const fetchedEntries = await fetchEntries() as FetchedData;

    return (
        <main>
            <ImageGallery images={fetchedEntries.digital} columns={3} />
        </main>
    );
};

export default Digital;

export const revalidate = 900;
