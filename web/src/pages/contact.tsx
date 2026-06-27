import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { PageLayout } from '@/components/templates/PageLayout';
import { logger } from '@/utils/logger';
import type { ContactPageDTO } from '@/types/pages';

interface ContactPageProps {
  pageData: ContactPageDTO;
}

const ContactPage: NextPage<ContactPageProps> = ({ pageData }) => {
  return (
    <>
      <Head>{generateNextSeo({ title: pageData.seo.title, description: pageData.seo.description })}</Head>
      <PageLayout>
        <section aria-label="Contact">
          <p>{pageData.intro_text}</p>
          <address>
            {pageData.email && (
              <a href={`mailto:${pageData.email}`}>{pageData.email}</a>
            )}
            {pageData.phone && (
              <a href={`tel:${pageData.phone}`}>{pageData.phone}</a>
            )}
            {pageData.address && <span>{pageData.address}</span>}
          </address>
        </section>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  try {
    const { strapiGet } = await import('@/lib/strapi');
    const response = await strapiGet<{ data: ContactPageDTO }>('/contact-page?populate=*');
    return {
      props: { pageData: response.data },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch contact page data', { error });
    return { notFound: true };
  }
};

export default ContactPage;
