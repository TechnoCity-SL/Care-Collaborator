import type { StatItemDTO } from '@/types/pages';

interface StatItemProps {
  stat: StatItemDTO;
  isPlain?: boolean;
}

export function StatItem({ stat, isPlain = false }: StatItemProps) {
  return (
    <div className="flex flex-col gap-2 px-4 lg:gap-3 lg:px-12 lg:first:pl-0 lg:last:pr-0">
      <p
        className="bg-clip-text font-heading text-[44px] font-semibold leading-none text-transparent sm:text-[52px] lg:text-[72px]"
        style={{ backgroundImage: 'linear-gradient(158.77deg, rgb(8, 223, 162) 1%, rgb(116, 188, 255) 99%)' }}
      >
        {stat.value}
      </p>
      <p className={`font-body text-[14px] leading-[1.5] lg:text-[16px] ${isPlain ? 'text-text-body' : 'text-white'}`}>
        {stat.label}
      </p>
    </div>
  );
}
