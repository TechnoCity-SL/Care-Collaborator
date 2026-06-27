import Image from 'next/image';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
import { StatItem } from '@/components/molecules/StatItem';
import type { StatsBannerDTO } from '@/types/pages';

interface StatsSectionProps {
  data: StatsBannerDTO;
  theme?: 'dark' | 'light';
}

export function StatsSection({ data, theme = 'dark' }: StatsSectionProps) {
  const { label, heading, stats, bg_image } = data;
  const hasBgImage = !!bg_image?.url;
  const isLight = theme === 'light' && !hasBgImage;
  const defaultBg = isLight ? 'bg-surface-steps' : 'bg-stats-gradient';

  return (
    <section
      className={`relative overflow-hidden py-[120px] ${hasBgImage ? '' : defaultBg}`}
      aria-labelledby="stats-heading"
    >
      {hasBgImage && (
        <Image
          src={bg_image.url}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-8">
        <div className="mb-[72px] flex flex-col items-center gap-8 text-center">
          {label && (
            <SectionLabel
              label={label}
              className={`mb-0 ${isLight ? '' : 'text-white/70'}`}
            />
          )}
          <Heading
            as="h2"
            id="stats-heading"
            text={heading}
            className={`font-heading text-[50px] font-semibold leading-[1.1] ${isLight ? 'text-text-dark' : 'text-white'}`}
          />
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} theme={isLight ? 'light' : 'dark'} />
          ))}
        </div>
      </div>
    </section>
  );
}
