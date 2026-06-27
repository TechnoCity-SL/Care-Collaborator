import type { StatItemDTO } from '@/types/pages';

interface StatItemProps {
  stat: StatItemDTO;
  theme?: 'dark' | 'light';
}

export function StatItem({ stat, theme = 'dark' }: StatItemProps) {
  const valueClass = theme === 'dark' ? 'text-white' : 'text-text-dark';
  const labelClass = theme === 'dark' ? 'text-white/70' : 'text-text-body';

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className={`font-heading text-5xl font-semibold lg:text-6xl ${valueClass}`}>
        {stat.value}
      </p>
      <p className={`font-body text-[16px] font-medium leading-normal ${labelClass}`}>
        {stat.label}
      </p>
    </div>
  );
}
