import Image from 'next/image';
import { FEATURE_ICON_SRC } from '@/lib/featureIcons';
import type { FeatureItemDTO } from '@/types/pages';

interface FeatureCardProps {
  feature: FeatureItemDTO;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const iconSrc = feature.icon_key ? FEATURE_ICON_SRC[feature.icon_key] : undefined;

  return (
    <div className="flex flex-col gap-6 rounded-[16px] bg-surface-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg">
      {iconSrc && (
        <div className="relative h-12 w-12 shrink-0">
          <Image src={iconSrc} alt="" fill className="object-contain" />
        </div>
      )}
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
