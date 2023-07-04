import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import { fetchEntries } from '@/utils/fetchData';

const Design = async () => {
  const fetchedEntries = (await fetchEntries()) as FetchedData;

  return (
    <main>
      <ImageGallery images={fetchedEntries.design} columns={3} />
    </main>
  );
};

export default Design;

export const revalidate = 900;
