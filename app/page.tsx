
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.sass'

// const inter = Inter({ subsets: ['latin'] })

import { fetchEntries } from './utils/fetchData'
import { NextPage } from 'next'
import { Gallery } from './shared/Gallery/Gallery'

// const inter = Inter({ subsets: ['latin'] })

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string, format: string, version: number, public_id: string, }> } };
type CloudinaryVideo = { fields: { title: string, link: string } };
type ContentfulImages = { title: string, content: Array<CloudinaryImage> };
type ContentfulVideos = { title: string, content: Array<CloudinaryVideo> };

type fetchedData = {
  concepts: ContentfulImages,
  digital: ContentfulImages,
  animations: ContentfulVideos
};

const Home = async () => {

  const fetchedEntries = await fetchEntries() as fetchedData;

  return (
    <main className={styles.main}>
      <Gallery data={fetchedEntries.concepts} />
    </main>
  )
}

export default Home;

export const revalidate = 900;
