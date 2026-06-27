import type { FeatureItemDTO } from '@/types/pages';

interface FeatureCardProps {
  feature: FeatureItemDTO;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[16px] bg-surface-card p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-video">
        <span className="text-xl text-blue" aria-hidden="true">✦</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-body text-[18px] font-medium leading-normal text-text-card">
          {feature.title}
        </h3>
        {feature.description && (
          <p className="font-body text-[14px] leading-[24px] text-text-body">
            {feature.description}
          </p>
        )}
      </div>
    </div>
  );
}
