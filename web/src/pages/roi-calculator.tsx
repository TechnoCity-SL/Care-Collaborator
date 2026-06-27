import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
import { CtaBanner } from '@/components/organisms/CtaBanner';
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

      <section className="bg-surface-alt py-16 sm:py-24" aria-labelledby="calculator-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {(pageData.calculator_label || pageData.calculator_heading) && (
            <div className="mb-10 text-center">
              {pageData.calculator_label && (
                <SectionLabel label={pageData.calculator_label} className="mb-3" />
              )}
              {pageData.calculator_heading && (
                <Heading
                  as="h2"
                  id="calculator-heading"
                  text={pageData.calculator_heading}
                  className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                />
              )}
              {pageData.calculator_subtext && (
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {pageData.calculator_subtext}
                </p>
              )}
            </div>
          )}

          {/* Calculator widget placeholder — logic is implemented as a client component */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <RoiCalculatorWidget />
          </div>
        </div>
      </section>

      {pageData.cta_banner && <CtaBanner data={pageData.cta_banner} />}
    </>
  );
};

function RoiCalculatorWidget() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="clients-per-month" className="block text-sm font-semibold text-gray-700 mb-2">
            New clients onboarded per month
          </label>
          <input
            id="clients-per-month"
            type="number"
            defaultValue={20}
            min={1}
            className="w-full rounded-lg border border-border px-4 py-3 text-gray-900 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </div>
        <div>
          <label htmlFor="coordinators" className="block text-sm font-semibold text-gray-700 mb-2">
            Number of care coordinators
          </label>
          <input
            id="coordinators"
            type="number"
            defaultValue={5}
            min={1}
            className="w-full rounded-lg border border-border px-4 py-3 text-gray-900 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </div>
        <div>
          <label htmlFor="avg-salary" className="block text-sm font-semibold text-gray-700 mb-2">
            Average coordinator hourly rate (AUD)
          </label>
          <input
            id="avg-salary"
            type="number"
            defaultValue={35}
            min={1}
            className="w-full rounded-lg border border-border px-4 py-3 text-gray-900 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </div>
        <div>
          <label htmlFor="return-visits" className="block text-sm font-semibold text-gray-700 mb-2">
            Avg. return visits per client (current)
          </label>
          <input
            id="return-visits"
            type="number"
            defaultValue={3}
            min={1}
            className="w-full rounded-lg border border-border px-4 py-3 text-gray-900 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </div>
      </div>

      <div className="rounded-xl bg-navy p-6 text-white">
        <p className="mb-4 text-sm font-semibold text-green uppercase tracking-widest">Estimated annual savings</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { value: '$42,000', label: 'In coordinator time' },
            { value: '720 hrs', label: 'Saved per year' },
            { value: '240', label: 'Fewer return visits' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold">{value}</p>
              <p className="mt-1 text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<RoiCalculatorPageProps> = async () => {
  try {
    const [pageData, globalData] = await Promise.all([
      fetchRoiCalculatorPage(),
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
