import Image from 'next/image';
import type { BadgeDTO } from '@/types/pages';

interface ComparisonCardProps {
  badge?: string;
  heading?: string;
  without: BadgeDTO[];
  with_: BadgeDTO[];
  averageSavingHeading?: string;
  averageSavingBody?: string;
}

export function ComparisonCard({
  badge,
  heading,
  without,
  with_,
  averageSavingHeading,
  averageSavingBody,
}: ComparisonCardProps) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -top-12 -left-10 hidden select-none lg:block"
        aria-hidden="true"
      >
        <Image src="/images/comparison-card/birdSide.png" alt="" width={102} height={102} />
      </div>

      {badge && (
        <span
          className="absolute -top-3 right-6 z-10 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-blue-dark"
          style={{ backgroundImage: 'linear-gradient(179deg, rgb(8, 223, 162) 1%, rgb(116, 188, 255) 99%)' }}
        >
          {badge}
        </span>
      )}

      <div className="relative rounded-[24px] bg-[#eef2fc] p-6 shadow-sm">
        {heading && (
          <h3 className="mb-4 font-body text-[16px] font-semibold leading-snug text-text-card">
            {heading}
          </h3>
        )}

        <div className="flex flex-col gap-4">
          {without.length > 0 && (
            <div className="rounded-2xl bg-rose-50 p-4">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-rose-600">
                Without CC
              </p>
              <ul className="flex flex-col gap-2">
                {without.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-[13px] leading-snug text-text-body">
                    <span className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true">✗</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {with_.length > 0 && (
            <div className="rounded-2xl bg-green/5 p-4">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-green">
                With CC
              </p>
              <ul className="flex flex-col gap-2">
                {with_.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-[13px] leading-snug text-text-body">
                    <span className="mt-0.5 shrink-0 font-bold text-green" aria-hidden="true">✓</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(averageSavingHeading || averageSavingBody) && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-steps p-4">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue/10">
              <Image src="/images/video-section/bird.png" alt="" width={20} height={18} />
            </div>
            <div>
              {averageSavingHeading && (
                <p className="font-body text-[14px] font-semibold leading-snug text-text-card">
                  {averageSavingHeading}
                </p>
              )}
              {averageSavingBody && (
                <p className="font-body text-[12px] leading-snug text-text-body">
                  {averageSavingBody}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
