import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { ArticleLayout } from '@/components/templates/ArticleLayout';
import { Tag } from '@/components/atoms/Tag';
import { fetchArticleBySlug, fetchAllArticleSlugs } from '@/repositories/insightsRepository';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { ArticleDTO, GlobalDTO } from '@/types/pages';

interface ArticlePageProps {
  article: ArticleDTO;
  globalData: GlobalDTO;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const date = new Date(article.publishedAt).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Head>
        {generateNextSeo({
          title: article.seo?.title ?? article.title,
          description: article.seo?.description ?? article.excerpt,
          noindex: article.seo?.no_index,
          canonical: article.seo?.canonicalURL,
        })}
      </Head>

      <div className="bg-navy py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <Tag category={article.category} />
            <span className="text-sm text-white/50">{date}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-4 text-lg text-white/70">{article.excerpt}</p>
          )}
          <div className="mt-6 flex items-center gap-4 text-sm text-white/50">
            {article.author && <span>By {article.author}</span>}
            {article.read_time && <span>{article.read_time} min read</span>}
          </div>
        </div>
      </div>

      <ArticleLayout>
        {/* body is Strapi richtext (Markdown). Render as plain text for now;
            swap for a markdown renderer (e.g. react-markdown) in Phase 3. */}
        <div className="prose prose-gray max-w-none whitespace-pre-line text-gray-700">
          {article.body}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/insights"
            className="text-sm font-semibold text-green hover:text-green-dark transition-colors"
          >
            ← Back to Insights
          </Link>
        </div>
      </ArticleLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await fetchAllArticleSlugs();
    return {
      paths: slugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (error) {
    logger.error('Failed to fetch article slugs', { error });
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== 'string') return { notFound: true };

  try {
    const [article, globalData] = await Promise.all([
      fetchArticleBySlug(slug),
      fetchGlobal(),
    ]);
    if (!article) return { notFound: true };

    return {
      props: { article, globalData },
      revalidate: 3600,
    };
  } catch (error) {
    logger.error('Failed to fetch article', { error, slug });
    return { notFound: true };
  }
};

export default ArticlePage;
