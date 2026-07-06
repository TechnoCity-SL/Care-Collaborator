import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
import { DiffFeatureItem } from '@/components/molecules/DiffFeatureItem';
import { ComparisonCard } from '@/components/molecules/ComparisonCard';
import type { AboutPageDTO } from '@/types/pages';

interface DifferenceSectionProps {
  data: AboutPageDTO;
}

export function DifferenceSection({ data }: DifferenceSectionProps) {
  const {
    diff_label,
    diff_heading,
    diff_subtext,
    diff_features,
    comparison_without,
    comparison_with,
    diff_card_badge,
    diff_card_heading,
    average_saving_heading,
    average_saving_body,
  } = data;

  return (
    <section className="bg-white py-16 md:py-20 lg:py-[120px]" aria-labelledby="diff-heading">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {diff_label && <SectionLabel label={diff_label} className="mb-3" />}
            <Heading
              as="h2"
              id="diff-heading"
              text={diff_heading}
              className="font-heading text-[clamp(28px,4vw,40px)] font-semibold leading-[1.15] text-text-dark"
            />
            {diff_subtext && (
              <p className="mt-4 font-body text-[15px] leading-[1.6] text-text-body">
                {diff_subtext}
              </p>
            )}

            {diff_features.length > 0 && (
              <div className="mt-8 flex flex-col gap-6">
                {diff_features.map((feature) => (
                  <DiffFeatureItem key={feature.id} feature={feature} />
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
