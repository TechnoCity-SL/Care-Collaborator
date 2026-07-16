import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/utils/logger';

function isSafeRedirectPath(url: unknown): url is string {
  return typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') && !url.includes('..');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { secret, url, status } = req.query;

  if (typeof secret !== 'string' || secret !== process.env.PREVIEW_SECRET) {
    res.status(401).json({ success: false, error: { code: 'invalid_secret', message: 'Invalid preview secret' } });
    return;
  }

  if (!isSafeRedirectPath(url)) {
    res.status(422).json({ success: false, error: { code: 'invalid_path', message: 'Invalid preview path' } });
    return;
  }

  res.setDraftMode({ enable: status !== 'published' });
  logger.info('Draft mode toggled via preview request', { url, status });
  res.redirect(307, url);
}
