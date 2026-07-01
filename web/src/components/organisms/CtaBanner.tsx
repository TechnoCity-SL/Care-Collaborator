import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import type { CtaBannerDTO } from '@/types/pages';

function Sparkle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 0C12 0 12.8 9.2 12 12C11.2 14.8 12 24 12 24C12 24 13.2 14.8 12 12C10.8 9.2 0 12 0 12C0 12 10.8 10.8 12 12C13.2 13.2 12 13.2 12 12C12 10.8 12 0 12 0Z"
        fill="#2A3B8F"
        fillOpacity="0.7"
      />
      <path
        d="M12 0C12 0 11.2 9.2 12 12C12.8 14.8 12 24 12 24C12 24 10.8 14.8 12 12C13.2 9.2 24 12 24 12C24 12 13.2 10.8 12 12C10.8 13.2 12 13.2 12 12C12 10.8 12 0 12 0Z"
        fill="#2A3B8F"
        fillOpacity="0.7"
      />
    </svg>
  );
}

interface CtaBannerProps {
  data: CtaBannerDTO;
}

export function CtaBanner({ data }: CtaBannerProps) {
  const { heading, subtext, primary_cta, secondary_cta, bg_image } = data;
  const hasBgImage = !!bg_image?.url;

  return (
    <section className="bg-surface-steps px-4 pb-16 pt-0 sm:px-6 lg:px-20 lg:pb-[120px]" aria-labelledby="cta-heading">
      <div
        className={`relative mx-auto overflow-hidden rounded-[32px] px-8 py-20 text-center lg:px-16 lg:py-24 ${hasBgImage ? '' : 'bg-cta-card-gradient'}`}
      >
        {hasBgImage && (
          <>
            <Image
              src={bg_image.url}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 rounded-[32px] bg-blue-dark/40" aria-hidden="true" />
          </>
        )}

        {/* Cloud shapes — top-left */}
        <div className="pointer-events-none absolute -left-8 -top-16 select-none" aria-hidden="true">
          <div className="relative h-56 w-72">
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-blue/35" />
            <div className="absolute bottom-0 left-16 h-32 w-44 rounded-full bg-blue/30" />
            <div className="absolute bottom-0 left-36 h-28 w-36 rounded-full bg-blue/25" />
            <div className="absolute bottom-4 left-4 h-24 w-56 rounded-full bg-blue/20" />
          </div>
        </div>

        {/* Cloud shapes — bottom-center */}
        <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none" aria-hidden="true">
          <div className="relative h-32 w-72">
            <div className="absolute bottom-0 left-0 h-28 w-32 rounded-full bg-white/60" />
            <div className="absolute bottom-0 left-20 h-24 w-36 rounded-full bg-white/55" />
            <div className="absolute bottom-2 left-8 h-20 w-48 rounded-full bg-white/50" />
          </div>
        </div>

        {/* Cloud shapes — bottom-right */}
        <div className="pointer-events-none absolute -bottom-8 -right-8 select-none" aria-hidden="true">
          <div className="relative h-40 w-56">
            <div className="absolute bottom-0 right-0 h-32 w-40 rounded-full bg-white/55" />
            <div className="absolute bottom-4 right-12 h-24 w-32 rounded-full bg-white/45" />
          </div>
        </div>

        {/* Sparkle decorations */}
        <Sparkle className="absolute right-[18%] top-[18%] h-5 w-5" />
        <Sparkle className="absolute right-[8%] top-[22%] h-7 w-7" />
        <Sparkle className="absolute bottom-[20%] left-[8%] h-5 w-5" />
        <Sparkle className="absolute bottom-[28%] left-[12%] h-3 w-3" />
        <Sparkle className="absolute bottom-[15%] left-[30%] h-4 w-4" />
        <Sparkle className="absolute bottom-[12%] right-[22%] h-4 w-4" />

        {/* Content */}
        <div className="relative z-10">
          <h2
            id="cta-heading"
            className="font-heading text-[clamp(28px,3.5vw,50px)] font-semibold leading-[1.1] text-white"
          >
            {heading}
          </h2>
          {subtext && (
            <p className="mx-auto mt-4 max-w-xl font-body text-[16px] leading-[1.8] text-white/80">
              {subtext}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              label={primary_cta.label}
              href={primary_cta.url}
              variant="primary"
              size="lg"
              className="px-8"
            />
            {secondary_cta && (
              <Button
                label={secondary_cta.label}
                href={secondary_cta.url}
                isExternal={secondary_cta.url.startsWith('tel:')}
                variant="secondary"
                size="lg"
                className="border-2 px-8"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
