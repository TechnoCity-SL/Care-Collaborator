import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { PageLayout } from '@/components/templates/PageLayout';
import { logger } from '@/utils/logger';
import type { ServiceDTO } from '@/types/pages';

interface ServicePageProps {
  service: ServiceDTO;
}

const ServicePage: NextPage<ServicePageProps> = ({ service }) => {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: service.seo?.title ?? service.title,
          description: service.seo?.description ?? service.description,
        })}
      </Head>
      <PageLayout>
        <article>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </article>
      </PageLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { strapiGet } = await import('@/lib/strapi');
    const response = await strapiGet<{ data: ServiceDTO[] }>('/services?fields[0]=slug');
    const paths = response.data.map((service) => ({
      params: { slug: service.slug },
    }));
    return { paths, fallback: 'blocking' };
  } catch (error) {
    logger.error('Failed to fetch service slugs for static paths', { error });
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== 'string') return { notFound: true };

  try {
    const { strapiGet } = await import('@/lib/strapi');
    const response = await strapiGet<{ data: ServiceDTO[] }>(
      `/services?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    const service = response.data[0];
    if (!service) return { notFound: true };

    return {
      props: { service },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch service page data', { error, slug });
    return { notFound: true };
  }
};

export default ServicePage;
