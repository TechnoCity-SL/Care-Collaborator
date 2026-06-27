import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { PageLayout } from '@/components/templates/PageLayout';
import { logger } from '@/utils/logger';
import type { AboutPageDTO } from '@/types/pages';

interface AboutPageProps {
  pageData: AboutPageDTO;
}

const AboutPage: NextPage<AboutPageProps> = ({ pageData }) => {
  return (
    <>
      <Head>{generateNextSeo({ title: pageData.seo.title, description: pageData.seo.description })}</Head>
      <PageLayout>
        <section aria-label="About">
          <p>{pageData.intro_text}</p>
        </section>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  try {
    const { strapiGet } = await import('@/lib/strapi');
    const response = await strapiGet<{ data: AboutPageDTO }>('/about-page?populate=*');
    return {
      props: { pageData: response.data },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch about page data', { error });
    return { notFound: true };
  }
};

export default AboutPage;
