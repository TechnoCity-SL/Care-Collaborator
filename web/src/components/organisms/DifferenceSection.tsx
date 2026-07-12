import Image from 'next/image';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
import { DiffFeatureItem } from '@/components/molecules/DiffFeatureItem';
import { ComparisonCard } from '@/components/molecules/ComparisonCard';
import type { DiffSectionDTO } from '@/types/pages';

interface DifferenceSectionProps {
  data: DiffSectionDTO;
}

export function DifferenceSection({ data }: DifferenceSectionProps) {
  const {
    label: diff_label,
    heading: diff_heading,
    subtext: diff_subtext,
    features: diff_features,
    comparison_without,
    comparison_with,
    card_badge: diff_card_badge,
    card_heading: diff_card_heading,
    average_saving_heading,
    average_saving_body,
    bg_image: diff_bg_image,
  } = data;
  const hasBgImage = !!diff_bg_image?.url;

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-20 lg:py-[120px] ${hasBgImage ? '' : 'bg-white'}`}
      aria-labelledby="diff-heading"
    >
      {hasBgImage && (
        <>
          <Image
            src={diff_bg_image.url}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-blue-dark/40" aria-hidden="true" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {diff_label && (
              <SectionLabel label={diff_label} theme={hasBgImage ? 'dark' : 'light'} className="mb-3" />
            )}
            <Heading
              as="h2"
              id="diff-heading"
              text={diff_heading}
              className={`font-heading text-[clamp(28px,4vw,40px)] font-semibold leading-[1.15] ${hasBgImage ? 'text-white' : 'text-text-dark'}`}
            />
            {diff_subtext && (
              <p className={`mt-4 font-body text-[15px] leading-[1.6] ${hasBgImage ? 'text-white/80' : 'text-text-body'}`}>
                {diff_subtext}
              </p>
            )}

            {diff_features.length > 0 && (
              <div className="mt-8 flex flex-col gap-6">
                {diff_features.map((feature) => (
                  <DiffFeatureItem key={feature.id} feature={feature} isLight={!hasBgImage} />
                ))}
              </div>
            )}
          </div>

          <ComparisonCard
            badge={diff_card_badge}
            heading={diff_card_heading}
            without={comparison_without}
            with_={comparison_with}
            averageSavingHeading={average_saving_heading}
            averageSavingBody={average_saving_body}
          />
        </div>
      </div>
    </section>
  );
}
