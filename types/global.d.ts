type CloudinaryImage = {
  fields: {
    title: string;
    cloudinary_image: Array<{ url: string; format: string; version: number; public_id: string }>;
  };
};

type CloudinaryVideo = { fields: { title: string; link: string } };

type ContentfulImages = { title: string; content: Array<CloudinaryImage> };

type ContentfulVideos = { title: string; content: Array<CloudinaryVideo> };

type ImageOrVideo = CloudinaryImage | CloudinaryVideo;

type ChunkedImages = { initialIndex: number; element: CloudinaryImage };

type FetchedData = {
  concepts: ContentfulImages;
  digital: ContentfulImages;
  animations: ContentfulVideos;
};
