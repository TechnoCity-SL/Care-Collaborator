import Image from 'next/image';
import type { FeatureItemDTO, FeatureIconKey } from '@/types/pages';

const ICON_SRC: Record<FeatureIconKey, string> = {
  data_sovereignty: '/images/features/icons/data-sovereignty.svg',
  e_signature: '/images/features/icons/e-signature.svg',
  russell_kennedy: '/images/features/icons/russell-kennedy.svg',
  budget_scenarios: '/images/features/icons/budget-scenarios.svg',
  integrations: '/images/features/icons/integrations.svg',
  risks_alerts: '/images/features/icons/risks-alerts.svg',
};

interface FeatureCardProps {
  feature: FeatureItemDTO;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const iconSrc = feature.icon_key ? ICON_SRC[feature.icon_key] : undefined;

  return (
    <div className="flex flex-col gap-6 rounded-[16px] bg-surface-card p-6">
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
