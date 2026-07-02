async function revalidateFrontend(paths: string[]): Promise<void> {
  const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '');
  const secret = process.env.REVALIDATE_SECRET;

  if (!frontendUrl || !secret) {
    strapi.log.warn(
      '[home-page] FRONTEND_URL or REVALIDATE_SECRET not set — skipping ISR revalidation.',
    );
    return;
  }

  try {
    const res = await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, paths }),
    });

    if (!res.ok) {
      const text = await res.text();
      strapi.log.error(`[home-page] ISR revalidation failed — HTTP ${res.status}: ${text}`);
      return;
    }

    strapi.log.info(`[home-page] ISR revalidation triggered for: ${paths.join(', ')}`);
  } catch (err) {
    strapi.log.error(`[home-page] Could not reach frontend for ISR: ${err}`);
  }
}

export default {
  afterCreate: () => revalidateFrontend(['/']),
  afterUpdate: () => revalidateFrontend(['/']),
};
