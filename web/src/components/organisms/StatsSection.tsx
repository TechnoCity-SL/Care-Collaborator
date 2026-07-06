import Image from 'next/image';
import { StatItem } from '@/components/molecules/StatItem';
import type { StatsBannerDTO } from '@/types/pages';

interface StatsSectionProps {
  data: StatsBannerDTO;
}

export function StatsSection({ data }: StatsSectionProps) {
  const { label, heading, stats, bg_image, theme = 'gradient' } = data;
  const hasBgImage = !!bg_image?.url;
  const isPlain = theme === 'plain';

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-20 lg:py-[120px] ${
        hasBgImage ? '' : isPlain ? 'bg-white border-b-2 border-[#929292]' : 'bg-stats-gradient'
      }`}
      aria-labelledby={heading ? 'stats-heading' : undefined}
      aria-label={heading ? undefined : 'Key statistics'}
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

      {!isPlain && (
        <>
          {/* Sparkle — left edge decoration */}
          <div
            className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none lg:block"
            style={{ left: '32px' }}
            aria-hidden="true"
          >
            <Image src="/images/features-section/sparkle.svg" alt="" width={43} height={45} />
          </div>

          {/* Bird mascot — bottom-right */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 hidden select-none lg:block"
            aria-hidden="true"
          >
            <Image src="/images/steps-section/bird.png" alt="" width={220} height={220} className="object-contain" />
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-0">
        {/* Header */}
        {(label || heading) && (
          <div className="mb-10 flex flex-col items-center gap-6 text-center lg:mb-[72px] lg:gap-8">
            {label && (
              <p
                className="bg-clip-text font-sans text-[18px] font-bold uppercase tracking-[1.98px] text-transparent"
                style={{ backgroundImage: 'linear-gradient(179deg, rgb(8, 223, 162) 1%, rgb(116, 188, 255) 99%)' }}
              >
                {label}
              </p>
            )}
            {heading && (
              <h2
                id="stats-heading"
                className={`font-heading text-[clamp(36px,4vw,50px)] font-semibold leading-[1.15] ${
                  isPlain ? 'text-text-dark' : 'text-white'
                }`}
              >
                {heading}
              </h2>
            )}
          </div>
        )}

        {/* Stats row — 2-col on mobile, 4-col on desktop with dividers */}
        <div
          className={`grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:flex lg:divide-x ${
            isPlain ? 'lg:divide-border' : 'lg:divide-white/25'
          }`}
        >
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} isPlain={isPlain} />
          ))}
        </div>
      </div>
    </section>
  );
}
