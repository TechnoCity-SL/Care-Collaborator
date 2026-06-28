import type { StepItemDTO } from '@/types/pages';

interface StepCardProps {
  step: StepItemDTO;
  index: number;
  isLast?: boolean;
}

export function StepCard({ step, index, isLast = false }: StepCardProps) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="flex flex-col gap-6 bg-surface-steps pr-8 last:pr-0">
      <div className="flex items-center gap-4">
        <span className="font-step-num text-[44px] leading-none text-step-num shrink-0">
          {stepNumber}
        </span>
        {!isLast && (
          <div className="flex flex-1 items-center gap-1" aria-hidden="true">
            <div
              className="h-[2px] flex-1"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, #0074ff55 0px, #0074ff55 5px, transparent 5px, transparent 12px)',
              }}
            />
            {/* Arrowhead */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
              <path d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5" stroke="#0074ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
