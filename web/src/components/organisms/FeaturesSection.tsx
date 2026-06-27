import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
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
  return (
    <section className="bg-white py-[120px]" aria-labelledby="features-heading">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-8">
        <div className="mb-[72px] flex flex-col items-center gap-8 text-center">
          {label && <SectionLabel label={label} className="mb-0" />}
          <Heading
            as="h2"
            id="features-heading"
            text={heading}
            highlight={headingHighlight}
            className="font-heading text-[50px] font-semibold leading-[1.1] text-text-dark"
          />
          {subtext && (
            <p className="max-w-[912px] text-[16px] leading-[29px] text-text-dark">
              {subtext}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
