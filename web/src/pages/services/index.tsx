import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { PageLayout } from '@/components/templates/PageLayout';
import { logger } from '@/utils/logger';
import type { ServiceDTO } from '@/types/pages';

interface ServicesPageProps {
  services: ServiceDTO[];
}

const ServicesPage: NextPage<ServicesPageProps> = ({ services }) => {
  return (
    <>
      <Head>{generateNextSeo({ title: 'Services', description: 'Browse our care services.' })}</Head>
      <PageLayout>
        <section aria-label="Services">
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <a href={`/services/${service.slug}`}>{service.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  try {
    const { strapiGet } = await import('@/lib/strapi');
    const response = await strapiGet<{ data: ServiceDTO[] }>('/services?populate=*');
    return {
      props: { services: response.data },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch services', { error });
    return { notFound: true };
  }
};

export default ServicesPage;
