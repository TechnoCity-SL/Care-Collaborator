import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { RoiCalculatorWidget } from '@/components/organisms/RoiCalculatorWidget';
import { fetchRoiCalculatorPage } from '@/repositories/roiCalculatorRepository';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { RoiCalculatorPageDTO, GlobalDTO } from '@/types/pages';

interface RoiCalculatorPageProps {
  pageData: RoiCalculatorPageDTO;
  globalData: GlobalDTO;
}

const RoiCalculatorPage: NextPage<RoiCalculatorPageProps> = ({ pageData }) => {
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

      <section className="bg-surface-alt py-16 sm:py-24" aria-label="ROI calculator">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
          <RoiCalculatorWidget />
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<RoiCalculatorPageProps> = async (context) => {
  try {
    const [pageData, globalData] = await Promise.all([
      fetchRoiCalculatorPage(context.draftMode),
      fetchGlobal(),
    ]);
    return {
      props: { pageData, globalData },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch ROI calculator page data', { error });
    return { notFound: true };
  }
};

export default RoiCalculatorPage;
