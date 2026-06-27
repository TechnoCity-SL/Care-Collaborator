import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Button } from '@/components/atoms/Button';
import {
  fetchInsightsPage,
  fetchArticles,
  fetchFeaturedArticle,
  fetchPopularArticles,
} from '@/repositories/insightsRepository';
import { CtaBanner } from '@/components/organisms/CtaBanner';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { InsightsPageDTO, ArticleDTO, GlobalDTO } from '@/types/pages';

interface InsightsIndexPageProps {
  pageData: InsightsPageDTO;
  globalData: GlobalDTO;
  featuredArticle: ArticleDTO | null;
  articles: ArticleDTO[];
  popularArticles: ArticleDTO[];
  total: number;
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

      {pageData.hero_banner && <HeroSection data={pageData.hero_banner} />}

      <div className="bg-surface-alt py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {featuredArticle && (
                <div className="mb-10">
                  <ArticleCard article={featuredArticle} featured />
                </div>
              )}

              {articles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-muted">No articles yet — check back soon.</p>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Sidebar">
              {/* CTA widget */}
              {pageData.sidebar_cta_heading && (
                <div className="mb-8 rounded-2xl bg-navy p-6 text-white">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green">
                    {pageData.sidebar_cta_heading}
                  </p>
                  {pageData.sidebar_cta_body && (
                    <p className="mb-5 text-sm leading-relaxed text-white/70">
                      {pageData.sidebar_cta_body}
                    </p>
                  )}
                  <div className="flex flex-col gap-3">
                    {pageData.sidebar_cta_primary && (
                      <Button
                        label={pageData.sidebar_cta_primary.label}
                        href={pageData.sidebar_cta_primary.url}
                        variant="primary"
                        size="sm"
                        className="w-full justify-center"
                      />
                    )}
                    {pageData.sidebar_cta_secondary && (
                      <Button
                        label={pageData.sidebar_cta_secondary.label}
                        href={pageData.sidebar_cta_secondary.url}
                        variant="secondary"
                        size="sm"
                        className="w-full justify-center"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Popular articles */}
              {popularArticles.length > 0 && (
                <div className="rounded-2xl border border-border bg-white p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
                    Popular this month
                  </p>
                  <ul className="divide-y divide-border">
                    {popularArticles.map((article) => (
                      <li key={article.id} className="py-4 first:pt-0 last:pb-0">
                        <a
                          href={`/insights/${article.slug}`}
                          className="group block"
                        >
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-green transition-colors line-clamp-2">
                            {article.title}
                          </p>
                          {article.read_time && (
                            <p className="mt-1 text-xs text-muted">{article.read_time} min read</p>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {pageData.cta_banner && <CtaBanner data={pageData.cta_banner} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<InsightsIndexPageProps> = async () => {
  try {
    const [pageData, globalData, featuredArticle, { articles, total }, popularArticles] =
      await Promise.all([
        fetchInsightsPage(),
        fetchGlobal(),
        fetchFeaturedArticle(),
        fetchArticles({ pageSize: 9 }),
        fetchPopularArticles(),
      ]);
    return {
      props: { pageData, globalData, featuredArticle, articles, popularArticles, total },
      revalidate: 3600,
    };
  } catch (error) {
    logger.error('Failed to fetch insights page data', { error });
    return { notFound: true };
  }
};

export default InsightsIndexPage;
