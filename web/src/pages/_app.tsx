import type { AppProps } from 'next/app';
import Head from 'next/head';
import { generateDefaultSeo } from 'next-seo/pages';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {generateDefaultSeo({
          titleTemplate: '%s — Care Collaborator',
          defaultTitle: 'Care Collaborator',
          openGraph: {
            type: 'website',
            locale: 'en_AU',
            siteName: 'Care Collaborator',
          },
        })}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
