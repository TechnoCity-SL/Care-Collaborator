import { strapiGet } from '@/lib/strapi';
import type { InsightsPageDTO, ArticleDTO } from '@/types/pages';

export async function fetchInsightsPage(): Promise<InsightsPageDTO> {
  const response = await strapiGet<{ data: InsightsPageDTO }>(
    '/insights-page' +
      '?populate[hero_banner][populate][primary_cta]=*' +
      '&populate[hero_banner][populate][secondary_cta]=*' +
      '&populate[hero_banner][populate][bg_image][fields][0]=url' +
      '&populate[hero_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][bg_image][fields][2]=width' +
      '&populate[hero_banner][populate][bg_image][fields][3]=height' +
      '&populate[sidebar_cta_primary]=*' +
      '&populate[sidebar_cta_secondary]=*' +
      '&populate[cta_banner][populate][primary_cta]=*' +
      '&populate[cta_banner][populate][secondary_cta]=*' +
      '&populate[cta_banner][populate][bg_image][fields][0]=url' +
      '&populate[cta_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[cta_banner][populate][bg_image][fields][2]=width' +
      '&populate[cta_banner][populate][bg_image][fields][3]=height' +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL'
  );
  return response.data;
}

export async function fetchArticles(params?: {
  page?: number;
  pageSize?: number;
}): Promise<{ articles: ArticleDTO[]; total: number }> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 9;
  const response = await strapiGet<{
    data: ArticleDTO[];
    meta: { pagination: { total: number } };
  }>(
    '/articles' +
      '?sort=publishedAt:desc' +
      `&pagination[page]=${page}` +
      `&pagination[pageSize]=${pageSize}` +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description'
  );
  return {
    articles: response.data,
    total: response.meta.pagination.total,
  };
}

export async function fetchFeaturedArticle(): Promise<ArticleDTO | null> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    '/articles?filters[featured][$eq]=true&pagination[pageSize]=1'
  );
  return response.data[0] ?? null;
}

export async function fetchPopularArticles(): Promise<ArticleDTO[]> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    '/articles?filters[popular][$eq]=true&pagination[pageSize]=4&sort=publishedAt:desc'
  );
  return response.data;
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleDTO | null> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL'
  );
  return response.data[0] ?? null;
}

export async function fetchAllArticleSlugs(): Promise<string[]> {
  const response = await strapiGet<{ data: ArticleDTO[] }>(
    '/articles?fields[0]=slug&pagination[pageSize]=100'
  );
  return response.data.map((a) => a.slug);
}
