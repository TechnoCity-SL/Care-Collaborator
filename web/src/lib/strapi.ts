const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
  throw new Error('Missing required Strapi environment variables.');
}

async function strapiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${STRAPI_API_URL}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Strapi fetch failed: ${response.status} ${response.statusText} — ${endpoint}`
    );
  }

  return response.json() as Promise<T>;
}

export { strapiGet };
