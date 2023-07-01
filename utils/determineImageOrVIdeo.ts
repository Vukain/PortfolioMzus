export const determineImageOrVideo = (toBeDetermined: ImageOrVideo): toBeDetermined is CloudinaryImage => {
  if ((toBeDetermined as CloudinaryImage).fields.cloudinary_image) {
    return true;
  }
  return false;
};
