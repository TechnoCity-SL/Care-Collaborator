import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { PageLayout } from '@/components/templates/PageLayout';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>{generateNextSeo({ title: 'Page Not Found', noindex: true })}</Head>
      <PageLayout>
        <section
          aria-label="Page not found"
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <h1 className="text-4xl font-semibold">Page Not Found</h1>
          <p className="mt-4 text-lg">The page you are looking for does not exist.</p>
          <Link
            href="/"
            className="mt-8 rounded-full bg-foreground px-6 py-3 text-background transition-colors hover:bg-[#383838]"
          >
            Return Home
          </Link>
        </section>
      </PageLayout>
    </>
  );
};

export default NotFoundPage;
