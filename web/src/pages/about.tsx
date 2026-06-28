import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { HeroSection } from '@/components/organisms/HeroSection';
import { StatsSection } from '@/components/organisms/StatsSection';
import { FeaturesSection } from '@/components/organisms/FeaturesSection';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
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

      {/* Origin */}
      <section className="bg-surface-alt py-20 sm:py-28" aria-labelledby="origin-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              {pageData.origin_label && (
                <SectionLabel label={pageData.origin_label} className="mb-3" />
              )}
              <Heading
                as="h2"
                id="origin-heading"
                text={pageData.origin_heading}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted whitespace-pre-line">
                {pageData.origin_body}
              </div>
            </div>

            {pageData.problem_items.length > 0 && (
              <div>
                {pageData.problem_heading && (
                  <p className="mb-4 text-sm font-semibold text-gray-700">{pageData.problem_heading}</p>
                )}
                <ul className="space-y-3">
                  {pageData.problem_items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/10 text-green text-xs font-bold">
                        ✓
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy py-20 sm:py-28" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {pageData.mission_label && (
              <SectionLabel label={pageData.mission_label} theme="dark" className="mb-3" />
            )}
            <blockquote
              id="mission-heading"
              className="text-2xl font-semibold italic text-white sm:text-3xl"
            >
              {pageData.mission_quote}
            </blockquote>
            {pageData.mission_body && (
              <p className="mt-6 text-base leading-relaxed text-white/70">{pageData.mission_body}</p>
            )}
          </div>
        </div>
      </section>

      {/* Mission values */}
      {pageData.mission_values.length > 0 && (
        <FeaturesSection
          heading="What we believe"
          features={pageData.mission_values}
        />
      )}

      {/* Why different */}
      <section className="bg-surface-alt py-20 sm:py-28" aria-labelledby="diff-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {pageData.diff_label && (
              <SectionLabel label={pageData.diff_label} className="mb-3" />
            )}
            <Heading
              as="h2"
              id="diff-heading"
              text={pageData.diff_heading}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            />
            {pageData.diff_subtext && (
              <p className="mt-4 text-base text-muted">{pageData.diff_subtext}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pageData.diff_features.map((f) => (
              <div key={f.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">{f.title}</h3>
                {f.description && <p className="text-sm leading-relaxed text-muted">{f.description}</p>}
              </div>
            ))}
          </div>

          {/* Comparison table */}
          {(pageData.comparison_without.length > 0 || pageData.comparison_with.length > 0) && (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Without Care Collaborator
                </p>
                <ul className="space-y-3">
                  {pageData.comparison_without.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="text-red-400">✗</span> {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-green/30 bg-green/5 p-6">
                <p className="mb-4 text-sm font-semibold text-green uppercase tracking-wide">
                  With Care Collaborator
                </p>
                <ul className="space-y-3">
                  {pageData.comparison_with.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="text-green font-bold">✓</span> {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

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
