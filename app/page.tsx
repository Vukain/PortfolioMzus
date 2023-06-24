
import Image from 'next/image'

import styles from './page.module.sass'

import { fetchEntries } from './utils/fetchData'
import { NextPage } from 'next'
import { ImageGallery } from './shared/ImageGallery/ImageGallery';

const Home = async () => {

  const fetchedEntries = await fetchEntries() as FetchedData;

  return (
    <main className={styles.main}>
      <ImageGallery images={fetchedEntries.concepts} />
    </main>
  );
};

export default Home;

export const revalidate = 900;
