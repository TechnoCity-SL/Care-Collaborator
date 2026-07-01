import type { StatItemDTO } from '@/types/pages';

interface StatItemProps {
  stat: StatItemDTO;
}

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="flex flex-col gap-2 px-4 lg:gap-3 lg:px-12 lg:first:pl-0 lg:last:pr-0">
      <p className="font-heading text-[44px] font-semibold leading-none text-teal sm:text-[52px] lg:text-[72px]">
        {stat.value}
      </p>
      <p className="font-body text-[14px] leading-[1.5] text-white lg:text-[16px]">
        {stat.label}
      </p>
    </div>
  );
}
