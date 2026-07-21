import Image from 'next/image';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { StepCard } from '@/components/molecules/StepCard';
import type { StepsSectionDTO } from '@/types/pages';

interface StepsSectionProps {
  data: StepsSectionDTO;
}

export function StepsSection({ data }: StepsSectionProps) {
  const { label, heading, heading_highlight: headingHighlight, steps } = data;
  const resolvedHighlight = (() => {
    if (headingHighlight && heading.includes(headingHighlight)) return headingHighlight;
    return null;
  })();

  const renderHeading = () => {
    if (!resolvedHighlight) return <>{heading}</>;
    const [before, after] = heading.split(resolvedHighlight);
    return (
      <>
        {before}
        <span className="relative inline-block">
          <span
            className="pointer-events-none absolute bottom-[-16px] left-0 right-0 select-none"
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
    <section className="relative overflow-hidden bg-surface-steps py-16 md:py-20 lg:py-[120px]" aria-labelledby="steps-heading">
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-0">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-6 text-center lg:mb-[72px] lg:gap-8">
          {label && <SectionLabel label={label} className="mb-0" />}
          <h2
            id="steps-heading"
            className="mx-auto max-w-[820px] font-heading text-[clamp(28px,4vw,50px)] font-semibold leading-[1.15] text-text-dark"
          >
            {renderHeading()}
          </h2>
        </div>

        {/* Steps — single row on desktop, 2-col on mobile */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
