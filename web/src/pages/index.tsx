import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { PartnerLogosSection } from '@/components/organisms/PartnerLogosSection';
import { VideoSection } from '@/components/organisms/VideoSection';
import { FeaturesSection } from '@/components/organisms/FeaturesSection';
import { StatsSection } from '@/components/organisms/StatsSection';
import { StepsSection } from '@/components/organisms/StepsSection';
import { CtaBanner } from '@/components/organisms/CtaBanner';
import { fetchHomePage } from '@/repositories/homePageRepository';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { HomePageDTO, GlobalDTO } from '@/types/pages';

interface HomePageProps {
  pageData: HomePageDTO;
  globalData: GlobalDTO;
}

const HomePage: NextPage<HomePageProps> = ({ pageData }) => {
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

      <PartnerLogosSection data={pageData.partner_logos_section} />

      {pageData.video_section && (pageData.video_section.video_url || pageData.video_section.video_file) && (
        <VideoSection data={pageData.video_section} />
      )}

      <FeaturesSection data={pageData.features_section} />

      {pageData.stats_banner && <StatsSection data={pageData.stats_banner} />}

      <StepsSection data={pageData.steps_section} />

      {pageData.cta_banner && <CtaBanner data={pageData.cta_banner} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [pageData, globalData] = await Promise.all([
      fetchHomePage(),
      fetchGlobal(),
    ]);
    return {
      props: { pageData, globalData },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch home page data', { error });
    return { notFound: true };
  }
};

export default HomePage;
