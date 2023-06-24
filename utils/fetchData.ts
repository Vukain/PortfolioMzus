import * as contentful from 'contentful';
import { cache } from 'react';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: space as string,
    accessToken: accessToken as string
});

type ContentfulImages = { fields: { title: string, content: Array<CloudinaryImage> } };
type ContentfulVideos = { fields: { title: string, content: Array<CloudinaryVideo> } };

export const fetchEntries = cache(async () => {

    const imageLists = await client.getEntries({ content_type: 'image-list' }).then((response) => { return response.items }) as Array<ContentfulImages>;
    const videoLists = await client.getEntries({ content_type: 'video-list' }).then((response) => { return response.items }) as Array<ContentfulVideos>;

    const [concepts] = imageLists.filter((item) => item.fields.title === 'concept-images');
    const [digital] = imageLists.filter((item) => item.fields.title === 'digital-images');
    const [animations] = videoLists.filter((item) => item.fields.title === 'animation-videos');

    // console.log(animations.fields.title)

    const content = {
        concepts: concepts.fields,
        digital: digital.fields,
        animations: animations.fields
    }

    if (imageLists || videoLists) {
        return content
    };
});