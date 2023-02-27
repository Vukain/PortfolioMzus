import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'

import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.sass'

import { fetchEntries } from '@/utils/fetchData'

// const inter = Inter({ subsets: ['latin'] })

type CloudinaryImage = { fields: { title: string, cloudinary_image: Array<{ url: string }> } };
type ContentfulImageList = Array<{ metadata: unknown, sys: unknown, fields: { title: string, content: Array<CloudinaryImage> } }>
type PropsType = { entries: CloudinaryImage[] }

const Home: NextPage<PropsType> = ({ entries }) => {


  const testImages = entries.map((image: CloudinaryImage, idx: number) => {
    return <img key={idx} src={`${image.fields.cloudinary_image[0].url}`} alt={image.fields.title}></img>
  })

  return (
    <>
      <Head>
        <title>Mzus - Portfolio</title>
        <meta name="description" content="Mzus - Portfolio..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {testImages}
      </main>
    </>
  )
};

export const getStaticProps = async () => {
  const fetchedEntries = await fetchEntries() as ContentfulImageList;
  const entries: Array<CloudinaryImage> = [];

  if (fetchedEntries) {
    for (const entry of fetchedEntries) {
      entries.push(...entry.fields.content);
    };
  };

  return {
    props: { entries },
    revalidate: 120
  }

};

export default Home;
