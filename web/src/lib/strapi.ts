async function strapiGet<T>(endpoint: string): Promise<T> {
  const apiUrl = process.env.STRAPI_API_URL;
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (!apiUrl || !apiToken) {
    throw new Error(
      'Missing Strapi env vars — set STRAPI_API_URL and STRAPI_API_TOKEN in .env.local'
    );
  }

  const response = await fetch(`${apiUrl}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi fetch failed: ${response.status} ${response.statusText} — ${endpoint}`
    );
  }

  return response.json() as Promise<T>;
}

export { strapiGet };
