import type { Core } from '@strapi/strapi';

async function getPreviewPathname(uid: string, documentId: string): Promise<string | null> {
  switch (uid) {
    case 'api::home-page.home-page':
      return '/';
    case 'api::about-page.about-page':
      return '/about';
    case 'api::privacy-page.privacy-page':
      return '/privacy';
    case 'api::roi-calculator-page.roi-calculator-page':
      return '/roi-calculator';
    case 'api::insights-page.insights-page':
      return '/insights';
    case 'api::article.article': {
      const article = await strapi.documents('api::article.article').findOne({ documentId });
      return article?.slug ? `/insights/${article.slug}` : null;
    }
    default:
      return null;
  }
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('FRONTEND_URL')],
      async handler(uid, { documentId, status }) {
        const pathname = await getPreviewPathname(uid, documentId);
        if (!pathname) return null;

        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: env('PREVIEW_SECRET'),
          status: status ?? 'draft',
        });

        return `${env('FRONTEND_URL')}/api/draft?${urlSearchParams}`;
      },
    },
  },
});

export default config;
