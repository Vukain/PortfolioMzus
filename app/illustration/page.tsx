import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import { fetchEntries } from '@/utils/fetchData';

const Illustration = async () => {
  const fetchedEntries = (await fetchEntries()) as FetchedData;

  return (
    <main>
      <ImageGallery images={fetchedEntries.illustration} columns={3} />
    </main>
  );
};

export default Illustration;

export const revalidate = 900;
