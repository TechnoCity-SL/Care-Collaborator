import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import type { CtaBannerDTO } from '@/types/pages';

interface CtaBannerProps {
  data: CtaBannerDTO;
}

export function CtaBanner({ data }: CtaBannerProps) {
  const { heading, subtext, primary_cta, secondary_cta, bg_image } = data;
  const hasBgImage = !!bg_image?.url;
  const isLight = !hasBgImage;

  if (!primary_cta) return null;

  return (
    <section className="bg-surface-steps px-4 pb-16 pt-0 sm:px-6 lg:px-20 lg:pb-[120px]" aria-labelledby="cta-heading">
      <div
        className={`relative mx-auto overflow-hidden rounded-[32px] px-8 py-20 text-center lg:px-16 lg:py-24 ${isLight ? 'bg-surface-video' : ''}`}
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
            {/* <div className="absolute inset-0 rounded-[32px] bg-blue-dark/40" aria-hidden="true" /> */}
          </>
        )}

        {/* Content */}
        <div className="relative z-10">
          <h2
            id="cta-heading"
            className={`font-heading text-[clamp(28px,3.5vw,50px)] font-semibold leading-[1.1] ${isLight ? 'text-text-dark' : 'text-white'}`}
          >
            {heading}
          </h2>
          {subtext && (
            <p className={`mx-auto mt-4 max-w-xl font-body text-[16px] leading-[1.8] ${isLight ? 'text-text-body' : 'text-white/80'}`}>
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
                variant={isLight ? 'secondary-light' : 'secondary'}
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
