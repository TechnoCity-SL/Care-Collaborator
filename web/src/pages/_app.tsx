import type { AppProps } from 'next/app';
import Head from 'next/head';
import { generateDefaultSeo } from 'next-seo/pages';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { fontVariables } from '@/lib/fonts';
import '@/styles/globals.css';
import type { GlobalDTO } from '@/types/pages';

export type AppPageProps = {
  globalData?: GlobalDTO;
};

export default function App({ Component, pageProps }: AppProps<AppPageProps>) {
  const { globalData } = pageProps;

  return (
    <div className={`${fontVariables} font-body flex min-h-screen flex-col`}>
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

      {globalData && <Header globalData={globalData} />}

      <main id="main-content" role="main" className="flex-1">
        <Component {...pageProps} />
      </main>

      {globalData && <Footer globalData={globalData} />}
    </div>
  );
}
