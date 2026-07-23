import Image from 'next/image';
import type { StepItemDTO } from '@/types/pages';

const BIRD_ASSET = '/images/steps-section/StepSectionBird.svg';

const ARROW_ASSETS = [
  { src: '/images/steps-section/Arrow1.svg', width: 158, height: 13 },
  { src: '/images/steps-section/Arrow2.svg', width: 158, height: 15 },
  { src: '/images/steps-section/Arrow3.svg', width: 158, height: 13 },
];

interface StepCardProps {
  step: StepItemDTO;
  index: number;
  isLast?: boolean;
  isFirst?: boolean;
}

export function StepCard({ step, index, isLast = false, isFirst = false }: StepCardProps) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="relative flex flex-col gap-6 bg-surface-steps lg:pr-8 lg:last:pr-0">
      {isFirst && (
        <div
          className="pointer-events-none absolute bottom-[10%] -left-80 hidden select-none lg:block"
          aria-hidden="true"
        >
          <Image
            src={BIRD_ASSET}
            alt=""
            width={200}
            height={200}
            className="h-auto w-[112px] object-contain xl:w-[260px] 2xl:w-[260px]"
            onError={() => {}}
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <span className="font-step-num text-[44px] leading-none text-step-num shrink-0">
          {stepNumber}
        </span>
        {!isLast && (
          <div className="hidden flex-1 items-center lg:flex" aria-hidden="true">
            <Image
              src={ARROW_ASSETS[index % ARROW_ASSETS.length].src}
              alt=""
              width={ARROW_ASSETS[index % ARROW_ASSETS.length].width}
              height={ARROW_ASSETS[index % ARROW_ASSETS.length].height}
              className="h-auto w-full"
            />
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
