import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { PageLayout } from '@/components/templates/PageLayout';
import { logger } from '@/utils/logger';
import type { HomePageDTO } from '@/types/pages';

interface HomePageProps {
  pageData: HomePageDTO;
}

const HomePage: NextPage<HomePageProps> = ({ pageData }) => {
  return (
    <>
      <Head>{generateNextSeo({ title: pageData.seo.title, description: pageData.seo.description })}</Head>
      <PageLayout>
        <section aria-label="Hero">
          <h1>{pageData.hero_title}</h1>
          {pageData.hero_subtitle && <p>{pageData.hero_subtitle}</p>}
        </section>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const { strapiGet } = await import('@/lib/strapi');
    const response = await strapiGet<{ data: HomePageDTO }>('/home-page?populate=*');
    return {
      props: { pageData: response.data },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch home page data', { error });
    return { notFound: true };
  }
};

export default HomePage;
