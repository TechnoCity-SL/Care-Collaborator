import { useState } from 'react';
import Image from 'next/image';
import type { PartnerLogosSectionDTO, CloudinaryMediaDTO } from '@/types/pages';

interface PartnerLogosSectionProps {
  data?: PartnerLogosSectionDTO;
}

const SPEED_DURATION: Record<string, number> = {
  slow: 60,
  normal: 30,
  fast: 15,
};

const PLACEHOLDER_LOGOS: CloudinaryMediaDTO[] = [
  { url: '', alternativeText: 'Provider A', width: 120, height: 40 },
  { url: '', alternativeText: 'Provider B', width: 120, height: 40 },
  { url: '', alternativeText: 'Provider C', width: 120, height: 40 },
  { url: '', alternativeText: 'Provider D', width: 120, height: 40 },
  { url: '', alternativeText: 'Provider E', width: 120, height: 40 },
];

/**
 * Duplicates `items` enough times to reach `minCount`, then doubles for the
 * seamless -50% marquee loop. Always returns an even-multiple of `items`.
 */
function buildMarqueeItems<T>(items: T[], minCount = 10): T[] {
  if (items.length === 0) return [];
  const copiesNeeded = Math.ceil(minCount / items.length);
  const evenCopies = copiesNeeded % 2 === 0 ? copiesNeeded : copiesNeeded + 1;
  return Array.from({ length: evenCopies * items.length }, (_, i) => items[i % items.length]);
}

export function PartnerLogosSection({ data }: PartnerLogosSectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  const heading = data?.heading ?? null;
  const rawLogos = data?.logos?.length ? data.logos : PLACEHOLDER_LOGOS;
  const duration = SPEED_DURATION[data?.speed ?? 'normal'];
  const direction = data?.direction ?? 'left';
  const pauseOnHover = data?.pause_on_hover ?? true;

  const marqueeItems = buildMarqueeItems(rawLogos);
  const usesPlaceholders = !data?.logos?.length;

  return (
    <section className="border-b border-border bg-white overflow-hidden" aria-label="Partner organisations">
      {heading && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-[18px] font-bold uppercase tracking-[1.98px] text-blue-label">
            {heading}
          </p>
        </div>
      )}

      <div
        className={`relative overflow-hidden`}
        onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      >
        {/* Fade masks on left and right edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />

        <div
          className="flex w-max items-center"
          style={{
            animation: `marquee-${direction} ${duration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          {marqueeItems.map((logo, i) => (
            <div
              key={i}
              className="flex h-[130px] w-[130px] flex-shrink-0 items-center justify-center"
            >
              {logo.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alternativeText ?? ''}
                  width={logo.width ?? 112}
                  height={logo.height ?? 40}
                  className="h-[130px] w-[130px] object-contain"
                />
              ) : (
                // Placeholder slot when no CMS logos are set
                <div
                  className="flex h-8 w-28 items-center justify-center rounded bg-surface-alt"
                  {...(usesPlaceholders ? { 'aria-label': logo.alternativeText } : {})}
                >
                  <span className="text-xs font-semibold text-muted/50">
                    {logo.alternativeText}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
