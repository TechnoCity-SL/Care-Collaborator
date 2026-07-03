import type { StepItemDTO } from '@/types/pages';

interface StepCardProps {
  step: StepItemDTO;
  index: number;
  isLast?: boolean;
}

export function StepCard({ step, index, isLast = false }: StepCardProps) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="flex flex-col gap-6 bg-surface-steps lg:pr-8 lg:last:pr-0">
      <div className="flex items-center gap-4">
        <span className="font-step-num text-[44px] leading-none text-step-num shrink-0">
          {stepNumber}
        </span>
        {!isLast && (
          <div className="hidden flex-1 items-center lg:flex" aria-hidden="true">
            <svg
              viewBox="0 0 112 24"
              preserveAspectRatio="none"
              className="h-6 w-full"
              fill="none"
            >
              <path
                d="M4 13C24 21 40 21 58 14C74 8 82 4 94 4"
                stroke="#0074ff55"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 9"
              />
              <path d="M92 0L108 4.5L92 9V0Z" fill="#0074ff" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-body text-[18px] font-semibold leading-normal text-text-card">
          {step.title}
        </h3>
        {step.description && (
          <p className="font-body text-[15px] leading-[1.6] text-text-body">
            {step.description}
          </p>
        )}
      </div>
    </div>
  );
}
