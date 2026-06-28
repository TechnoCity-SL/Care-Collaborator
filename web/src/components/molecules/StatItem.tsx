import type { StatItemDTO } from '@/types/pages';

interface StatItemProps {
  stat: StatItemDTO;
}

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="flex flex-col gap-3 px-8 first:pl-0 last:pr-0 lg:px-12">
      <p className="font-heading text-[56px] font-semibold leading-none text-teal lg:text-[72px]">
        {stat.value}
      </p>
      <p className="font-body text-[15px] leading-[1.5] text-white lg:text-[16px]">
        {stat.label}
      </p>
    </div>
  );
}
