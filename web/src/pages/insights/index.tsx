import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { InsightsExplorer } from '@/components/organisms/InsightsExplorer';
import {
  fetchInsightsPage,
  fetchArticles,
  fetchFeaturedArticle,
  fetchPopularArticles,
} from '@/repositories/insightsRepository';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { InsightsPageDTO, ArticleDTO, GlobalDTO } from '@/types/pages';

interface InsightsIndexPageProps {
  pageData: InsightsPageDTO;
  globalData: GlobalDTO;
  featuredArticle: ArticleDTO | null;
  articles: ArticleDTO[];
  popularArticles: ArticleDTO[];
}

const InsightsIndexPage: NextPage<InsightsIndexPageProps> = ({
  pageData,
  featuredArticle,
  articles,
  popularArticles,
}) => {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: pageData.seo.title,
          description: pageData.seo.description,
          noindex: pageData.seo.no_index,
          canonical: pageData.seo.canonicalURL,
        })}
      </Head>

      <InsightsExplorer
        pageData={pageData}
        articles={articles}
        featuredArticle={featuredArticle}
        popularArticles={popularArticles}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<InsightsIndexPageProps> = async (context) => {
  try {
    const [pageData, globalData, featuredArticle, { articles }, popularArticles] = await Promise.all([
      fetchInsightsPage(context.draftMode),
      fetchGlobal(),
      fetchFeaturedArticle(),
      fetchArticles({ pageSize: 60 }),
      fetchPopularArticles(),
    ]);
    return {
      props: { pageData, globalData, featuredArticle, articles, popularArticles },
      revalidate: 3600,
    };
  } catch (error) {
    logger.error('Failed to fetch insights page data', { error });
    return { notFound: true };
  }
};

export default InsightsIndexPage;
