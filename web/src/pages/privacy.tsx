import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ArticleLayout } from '@/components/templates/ArticleLayout';
import { ArticleBody } from '@/components/molecules/ArticleBody';
import { fetchPrivacyPage } from '@/repositories/privacyPageRepository';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { PrivacyPageDTO, GlobalDTO } from '@/types/pages';

interface PrivacyPageProps {
  pageData: PrivacyPageDTO;
  globalData: GlobalDTO;
}

const PrivacyPage: NextPage<PrivacyPageProps> = ({ pageData }) => {
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

      <ArticleLayout>
        <ArticleBody body={pageData.body} />
      </ArticleLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<PrivacyPageProps> = async () => {
  try {
    const [pageData, globalData] = await Promise.all([
      fetchPrivacyPage(),
      fetchGlobal(),
    ]);
    return {
      props: { pageData, globalData },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch privacy page data', { error });
    return { notFound: true };
  }
};

export default PrivacyPage;
