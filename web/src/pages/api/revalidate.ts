import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/utils/logger';

type RevalidateResponse = {
  success: boolean;
  revalidated?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidateResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { secret, paths } = req.body as { secret?: string; paths?: string[] };

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ success: false, error: 'Invalid revalidation secret' });
  }

  if (!Array.isArray(paths) || paths.length === 0) {
    return res.status(422).json({ success: false, error: 'paths must be a non-empty array' });
  }

  const validPaths = paths.filter(
    (p) => typeof p === 'string' && p.startsWith('/') && !p.includes('..')
  );

  if (validPaths.length === 0) {
    return res.status(422).json({ success: false, error: 'No valid paths provided' });
  }

  try {
    await Promise.all(validPaths.map((path) => res.revalidate(path)));
    logger.info('ISR revalidation triggered', { paths: validPaths });
    return res.status(200).json({ success: true, revalidated: validPaths });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Revalidation failed';
    logger.error('ISR revalidation failed', { error: message, paths: validPaths });
    return res.status(500).json({ success: false, error: message });
  }
}
