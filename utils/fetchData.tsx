import * as contentful from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: space as string,
    accessToken: accessToken as string
});

export const fetchEntries = async () => {
    // const response = await client.getContentType('imageList');
    const entries = await client.getEntries({ content_type: 'imageList' });

    // console.log(entries.items[0].fields)

    if (entries.items) {
        return entries.items
    };
};