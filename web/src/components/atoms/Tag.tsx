import type { ArticleCategory } from '@/types/pages';

interface TagProps {
  category: ArticleCategory;
  className?: string;
}

export const categoryConfig: Record<ArticleCategory, { label: string; bgClass: string; textClass: string }> = {
  technology:             { label: 'Technology',             bgClass: 'bg-cat-tech-bg',      textClass: 'text-cat-tech-text' },
  onboarding:             { label: 'Onboarding',              bgClass: 'bg-cat-onboard-bg',   textClass: 'text-cat-onboard-text' },
  fuel_and_costs:         { label: 'Fuel & costs',            bgClass: 'bg-cat-fuel-bg',      textClass: 'text-cat-fuel-text' },
  e_signature:            { label: 'E-signature',             bgClass: 'bg-cat-esig-bg',      textClass: 'text-cat-esig-text' },
  digital_transformation: { label: 'Digital transformation',  bgClass: 'bg-cat-transform-bg', textClass: 'text-cat-transform-text' },
  operations:             { label: 'Operations',              bgClass: 'bg-cat-ops-bg',       textClass: 'text-cat-ops-text' },
  digital:                { label: 'Digital',                 bgClass: 'bg-cat-digital-bg',   textClass: 'text-cat-digital-text' },
};

export function getCategoryLabel(category: ArticleCategory): string {
  return categoryConfig[category].label;
}

export function Tag({ category, className = '' }: TagProps) {
  const { label, bgClass, textClass } = categoryConfig[category];
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${bgClass} ${textClass} ${className}`}
    >
      {label}
    </span>
  );
}
