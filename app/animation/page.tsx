import Head from 'next/head'

import { VideoGallery } from '../shared/VideoGallery/VideoGallery';
import { fetchEntries } from '../utils/fetchData'

const Animation = async () => {

    const fetchedEntries = await fetchEntries() as FetchedData;

    return (
        <>
            <Head>
                <title>Contact - TitleMetaNextjs</title>
                <meta
                    name="description"
                    content="Meta description for the Contact page"
                />
            </Head>
            <main>
                <VideoGallery videos={fetchedEntries.animations} />
            </main>
        </>
    )
}

export default Animation;

export const revalidate = 900;
