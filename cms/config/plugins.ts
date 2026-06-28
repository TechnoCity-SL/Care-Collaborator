import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: { folder: 'Care-Collaborator-Web', resource_type: 'auto' },
        uploadStream: { folder: 'Care-Collaborator-Web', resource_type: 'auto' },
        delete: {},
      },
      sizeLimit: 512 * 1024 * 1024,
      security: {
        allowedFileTypes: ['image/*', 'video/*', 'application/pdf'],
      },
    },
  },
});

export default config;
