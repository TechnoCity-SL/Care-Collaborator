import { strapiGet } from '@/lib/strapi';
import type { InsightsPageDTO, ArticleDTO } from '@/types/pages';

export async function fetchInsightsPage(draft = false): Promise<InsightsPageDTO> {
  const response = await strapiGet<{ data: InsightsPageDTO }>(
    '/insights-page' +
      '?populate[hero_banner][populate][primary_cta]=*' +
      '&populate[hero_banner][populate][secondary_cta]=*' +
      '&populate[hero_banner][populate][bg_image][fields][0]=url' +
      '&populate[hero_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][bg_image][fields][2]=width' +
      '&populate[hero_banner][populate][bg_image][fields][3]=height' +
      '&populate[hero_banner][populate][badges]=*' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][0]=url' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][2]=width' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][3]=height' +
      '&populate[sidebar_cta_primary]=*' +
      '&populate[sidebar_cta_secondary]=*' +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL',
    { draft }
  );
  return response.data;
}

const COVER_IMAGE_POPULATE =
  '&populate[cover_image][fields][0]=url' +
  '&populate[cover_image][fields][1]=alternativeText' +
  '&populate[cover_image][fields][2]=width' +
  '&populate[cover_image][fields][3]=height';

export async function fetchArticles(params?: {
  page?: number;
  pageSize?: number;
}): Promise<{ articles: ArticleDTO[]; total: number }> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 60;
  const response = await strapiGet<{
    data: ArticleDTO[];
    meta: { pagination: { total: number } };
  }>(
    '/articles' +
      '?sort=publishedAt:desc' +
      `&pagination[page]=${page}` +
      `&pagination[pageSize]=${pageSize}` +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      COVER_IMAGE_POPULATE
  );
  return {
    articles: response.data,
    total: response.meta.pagination.total,
  };
}

export async function fetchFeaturedArticle(): Promise<ArticleDTO | null> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    '/articles?filters[featured][$eq]=true&pagination[pageSize]=1' + COVER_IMAGE_POPULATE
  );
  return response.data[0] ?? null;
}

export async function fetchPopularArticles(): Promise<ArticleDTO[]> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    '/articles?filters[popular][$eq]=true&pagination[pageSize]=4&sort=publishedAt:desc' + COVER_IMAGE_POPULATE
  );
  return response.data;
}

export async function fetchArticleBySlug(slug: string, draft = false): Promise<ArticleDTO | null> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL' +
      COVER_IMAGE_POPULATE,
    { draft }
  );
  return response.data[0] ?? null;
}

export async function fetchAllArticleSlugs(): Promise<string[]> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    '/articles?fields[0]=slug&pagination[pageSize]=100'
  );
  return response.data.map((a) => a.slug);
}
