import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import type { CtaBannerDTO } from '@/types/pages';

interface CtaBannerProps {
  data: CtaBannerDTO;
}

export function CtaBanner({ data }: CtaBannerProps) {
  const { heading, subtext, primary_cta, secondary_cta, bg_image } = data;
  const hasBgImage = !!bg_image?.url;

  return (
    <section className="bg-surface-steps px-20 pb-[120px] pt-10" aria-labelledby="cta-heading">
      <div
        className={`relative mx-auto overflow-hidden rounded-[40px] px-16 py-24 text-center ${hasBgImage ? '' : 'bg-cta-card-gradient'}`}
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

        {!hasBgImage && (
          <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
            <div className="absolute -bottom-10 -right-20 h-64 w-96 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -left-16 top-0 h-48 w-72 rounded-full bg-white/30 blur-2xl" />
          </div>
        )}

        {hasBgImage && (
          <div className="absolute inset-0 rounded-[40px] bg-blue-dark/50" aria-hidden="true" />
        )}

        <div className="relative z-10">
          <h2
            id="cta-heading"
            className="font-heading text-[50px] font-semibold leading-[1.1] text-white"
          >
            {heading}
          </h2>
          {subtext && (
            <p className="mx-auto mt-4 max-w-xl font-body text-[16px] leading-[1.8] text-white/80">
              {subtext}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button label={primary_cta.label} href={primary_cta.url} variant="primary" size="lg" />
            {secondary_cta && (
              <Button
                label={secondary_cta.label}
                href={secondary_cta.url}
                isExternal={secondary_cta.url.startsWith('tel:')}
                variant="secondary"
                size="lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
