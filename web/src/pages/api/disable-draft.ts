import type { NextApiRequest, NextApiResponse } from 'next';

function isSafeRedirectPath(url: unknown): url is string {
  return typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') && !url.includes('..');
}

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  res.setDraftMode({ enable: false });
  const redirectTo = isSafeRedirectPath(req.query.url) ? req.query.url : '/';
  res.redirect(307, redirectTo);
}
