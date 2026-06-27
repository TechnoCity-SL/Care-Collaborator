import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
}

export function getOptimisedImageUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  const image = cloudinary.image(publicId);

  image.delivery(format(autoFormat())).delivery(quality(autoQuality()));

  if (options.width || options.height) {
    const resizeAction = auto();
    if (options.width) resizeAction.width(options.width);
    if (options.height) resizeAction.height(options.height);
    image.resize(resizeAction);
  }

  return image.toURL();
}

export default cloudinary;
