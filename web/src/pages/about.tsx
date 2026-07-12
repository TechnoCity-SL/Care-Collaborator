import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { StatsSection } from '@/components/organisms/StatsSection';
import { OriginSection } from '@/components/organisms/OriginSection';
import { MissionSection } from '@/components/organisms/MissionSection';
import { DifferenceSection } from '@/components/organisms/DifferenceSection';
import { CtaBanner } from '@/components/organisms/CtaBanner';
import { fetchAboutPage } from '@/repositories/aboutPageRepository';
import { fetchGlobal } from '@/repositories/globalRepository';
import { logger } from '@/utils/logger';
import type { AboutPageDTO, GlobalDTO } from '@/types/pages';

interface AboutPageProps {
  pageData: AboutPageDTO;
  globalData: GlobalDTO;
}

const AboutPage: NextPage<AboutPageProps> = ({ pageData }) => {
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

      {pageData.stats_banner && <StatsSection data={pageData.stats_banner} />}

      <OriginSection data={pageData.origin_section} />

      <MissionSection data={pageData.mission_section} />

      <DifferenceSection data={pageData.diff_section} />

      {pageData.cta_banner && <CtaBanner data={pageData.cta_banner} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  try {
    const [pageData, globalData] = await Promise.all([
      fetchAboutPage(),
      fetchGlobal(),
    ]);
    return {
      props: { pageData, globalData },
      revalidate: 86400,
    };
  } catch (error) {
    logger.error('Failed to fetch about page data', { error });
    return { notFound: true };
  }
};

export default AboutPage;
