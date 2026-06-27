import type { AppProps } from 'next/app';
import Head from 'next/head';
import { generateDefaultSeo } from 'next-seo/pages';
import { Inter, Poppins, Instrument_Sans, Skranji } from 'next/font/google';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import '@/styles/globals.css';
import type { GlobalDTO } from '@/types/pages';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-instrument',
});
const skranji = Skranji({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-skranji',
});

export type AppPageProps = {
  globalData?: GlobalDTO;
};

export default function App({ Component, pageProps }: AppProps<AppPageProps>) {
  const { globalData } = pageProps;
  const fontVars = [
    inter.variable,
    poppins.variable,
    instrumentSans.variable,
    skranji.variable,
  ].join(' ');

  return (
    <div className={`${fontVars} flex min-h-screen flex-col`}>
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
