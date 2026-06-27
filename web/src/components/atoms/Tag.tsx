import type { ArticleCategory } from '@/types/pages';

interface TagProps {
  category: ArticleCategory;
  className?: string;
}

const categoryConfig: Record<ArticleCategory, { label: string; className: string }> = {
  technology:           { label: 'Technology',           className: 'bg-cat-tech/10 text-cat-tech' },
  onboarding:           { label: 'Onboarding',           className: 'bg-cat-onboard/10 text-cat-onboard' },
  fuel_and_costs:       { label: 'Fuel & Costs',         className: 'bg-cat-fuel/10 text-cat-fuel' },
  e_signature:          { label: 'E-Signature',          className: 'bg-cat-esig/10 text-cat-esig' },
  digital_transformation:{ label: 'Digital Transformation', className: 'bg-cat-transform/10 text-cat-transform' },
  operations:           { label: 'Operations',           className: 'bg-cat-ops/10 text-cat-ops' },
  digital:              { label: 'Digital',              className: 'bg-cat-digital/10 text-cat-digital' },
};

export function Tag({ category, className = '' }: TagProps) {
  const { label, className: colorClass } = categoryConfig[category];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${colorClass} ${className}`}
    >
      {label}
    </span>
  );
}
