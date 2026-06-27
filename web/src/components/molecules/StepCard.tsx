import type { StepItemDTO } from '@/types/pages';

interface StepCardProps {
  step: StepItemDTO;
  index: number;
}

export function StepCard({ step, index }: StepCardProps) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="flex flex-col gap-6 bg-surface-steps p-6">
      <div className="flex items-center gap-6">
        <span className="font-step-num text-[44px] leading-none text-step-num">
          {stepNumber}
        </span>
        <div className="h-[2px] flex-1 bg-blue/20" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-body text-[18px] font-medium leading-normal text-text-card">
          {step.title}
        </h3>
        {step.description && (
          <p className="font-body text-[16px] leading-normal text-text-body">
            {step.description}
          </p>
        )}
      </div>
    </div>
  );
}
