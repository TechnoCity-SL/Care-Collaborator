import Image from 'next/image';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import type { FeatureItemDTO } from '@/types/pages';

interface FeaturesSectionProps {
  label?: string;
  heading: string;
  headingHighlight?: string;
  subtext?: string;
  features: FeatureItemDTO[];
}

export function FeaturesSection({
  label,
  heading,
  headingHighlight,
  subtext,
  features,
}: FeaturesSectionProps) {
  const resolvedHighlight = (() => {
    if (headingHighlight && heading.includes(headingHighlight)) return headingHighlight;
    return heading;
  })();

  const renderHeading = () => {
    const [before, after] = heading.split(resolvedHighlight);
    return (
      <>
        {before}
        <span className="relative inline-block">
          {/* Wavy brush underline — rendered first so it sits behind the text */}
          <span
            className="pointer-events-none absolute inset-x-0 bottom-[-14px] select-none"
            aria-hidden="true"
          >
            <Image
              src="/images/features-section/wavy-underline.svg"
              alt=""
              width={304}
              height={44}
              className="h-auto w-full"
            />
          </span>
          <span className="relative">{resolvedHighlight}</span>
        </span>
        {after}
      </>
    );
  };

  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-[120px]" aria-labelledby="features-heading">
      {/* Sparkle — top-right decorative */}
      <div
        className="pointer-events-none absolute top-[300px] hidden select-none lg:block"
        style={{ left: 'calc(50% + 660px)' }}
        aria-hidden="true"
      >
        <Image
          src="/images/features-section/sparkle.svg"
          alt=""
          width={43}
          height={45}
        />
      </div>

      <div className="mx-auto max-w-[1300px] px-6 lg:px-0">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-6 text-center lg:mb-[72px] lg:gap-8">
          {label && <SectionLabel label={label} className="mb-0" />}
          <h2
            id="features-heading"
            className="font-heading text-[clamp(32px,4vw,50px)] font-semibold leading-[1.15] text-text-dark"
          >
            {renderHeading()}
          </h2>
          {subtext && (
            <p className="max-w-[912px] text-[16px] leading-[29px] text-text-dark">
              {subtext}
            </p>
          )}
        </div>

        {/* Cards — two rows of three, any overflow fills further rows */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
