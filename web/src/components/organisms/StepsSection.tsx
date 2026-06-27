import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
import { StepCard } from '@/components/molecules/StepCard';
import type { StepItemDTO } from '@/types/pages';

interface StepsSectionProps {
  label?: string;
  heading: string;
  steps: StepItemDTO[];
}

export function StepsSection({ label, heading, steps }: StepsSectionProps) {
  return (
    <section className="bg-surface-steps py-[120px]" aria-labelledby="steps-heading">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-8">
        <div className="mb-[72px] flex flex-col items-center gap-8 text-center">
          {label && <SectionLabel label={label} className="mb-0" />}
          <Heading
            as="h2"
            id="steps-heading"
            text={heading}
            className="font-heading text-[50px] font-semibold leading-[1.1] text-text-dark"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
