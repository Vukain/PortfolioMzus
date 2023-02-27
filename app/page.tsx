import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.sass'

// const inter = Inter({ subsets: ['latin'] })

import { fetchEntries } from './utils/fetchData'
import { NextPage } from 'next'

// const inter = Inter({ subsets: ['latin'] })

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string }> } };
type ContentfulImageList = Array<{ metadata: unknown, sys: unknown, fields: { title: string, content: Array<CloudinaryImage> } }>
// type PropsType = { entries: CloudinaryImage[] }

const Home = async () => {

  const fetchedEntries = await fetchEntries() as ContentfulImageList;
  const entries: CloudinaryImage[] = [];

  if (fetchedEntries) {
    for (const entry of fetchedEntries) {
      entries.push(...entry.fields.content);
    };
  };

  const testImages = entries.map((image: CloudinaryImage, idx: number) => {
    return <img key={idx} src={`${image.fields.cloudinary_image[0].url}`} alt={image.fields.title}></img>
  })

  return (
    <>
      <main className={styles.main}>
        {testImages}
      </main>
    </>
  )
}

export default Home;

export const revalidate = 120;
