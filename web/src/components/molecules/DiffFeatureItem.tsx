import Image from 'next/image';
import { FEATURE_ICON_SRC } from '@/lib/featureIcons';
import type { FeatureItemDTO, FeatureIconKey } from '@/types/pages';

const CHIP_BG: Partial<Record<FeatureIconKey, string>> = {
  star: 'bg-green/10',
  check_circle: 'bg-blue/10',
  shield: 'bg-amber-100',
  heart_care: 'bg-rose-100',
};

interface DiffFeatureItemProps {
  feature: FeatureItemDTO;
}

export function DiffFeatureItem({ feature }: DiffFeatureItemProps) {
  const iconSrc = feature.icon_key ? FEATURE_ICON_SRC[feature.icon_key] : undefined;
  const chipBg = (feature.icon_key && CHIP_BG[feature.icon_key]) ?? 'bg-blue/10';

  return (
    <div className="flex items-start gap-4">
      {iconSrc && (
        <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${chipBg}`}>
          <Image src={iconSrc} alt="" width={20} height={20} />
        </div>
      )}
      <div className="flex flex-col gap-1 pt-1">
        <h3 className="font-body text-[16px] font-semibold leading-normal text-text-card">
          {feature.title}
        </h3>
        {feature.description && (
          <p className="font-body text-[14px] leading-[1.6] text-text-body">
            {feature.description}
          </p>
        )}
      </div>
    </div>
  );
}
