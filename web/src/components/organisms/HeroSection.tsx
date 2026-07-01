import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge';
import { Heading } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';
import type { HeroBannerDTO } from '@/types/pages';

interface HeroSectionProps {
  data: HeroBannerDTO;
}

export function HeroSection({ data }: HeroSectionProps) {
  const {
    badge,
    title,
    title_highlight,
    subtitle,
    primary_cta,
    secondary_cta,
    image,
    bg_image,
    badges,
  } = data;

  const hasContentImage = !!image?.url;
  const hasBgImage = !!bg_image?.url;
  const hasBadgeChips = !!badges?.length;

  return (
    <section
      className={`relative overflow-hidden ${hasBgImage ? '' : 'bg-hero-gradient'}`}
      aria-labelledby="hero-heading"
    >
      {hasBgImage && (
        <Image
          src={bg_image.url}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      )}

      {/* Decorative cloud blobs */}
      {!hasBgImage && (
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
          <div className="absolute -left-24 -top-16 h-64 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -left-10 top-8 h-40 w-56 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-10 -left-16 h-52 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -top-8 right-32 h-40 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-10 top-10 h-28 w-40 rounded-full bg-white/15 blur-2xl" />
          <svg
            className="absolute right-[12%] top-[30%] h-6 w-6 text-blue-dark/40"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
          </svg>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 py-20 lg:px-[70px] lg:py-[100px]">
        <div className={`flex gap-14 ${hasContentImage ? 'flex-col lg:flex-row lg:items-center' : 'flex-col'}`}>

          {/* Text column */}
          <div className={`flex flex-col gap-10 lg:gap-[72px] ${hasContentImage ? 'lg:w-1/2' : 'max-w-[880px]'}`}>

            {/* Top group: badge → title → subtitle */}
            <div className="flex flex-col gap-6 items-start lg:gap-[32px]">
              {badge && <Badge label={badge} theme="hero" />}

              <div className="flex flex-col gap-5 max-w-[770px] w-full lg:gap-[24px]">
                <Heading
                  as="h1"
                  id="hero-heading"
                  text={title}
                  highlight={title_highlight}
                  className="font-heading text-[36px] font-medium leading-[44px] text-white sm:text-[46px] sm:leading-[56px] lg:text-[60px] lg:leading-[72px]"
                  highlightClassName="font-bold text-[#003677]"
                />

                {subtitle && (
                  <p className="font-body text-[16px] leading-normal text-white">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom group: CTA buttons + optional trust badges */}
            <div className="flex flex-col gap-6 items-start">
              {(primary_cta || secondary_cta) && (
                <div className="flex flex-wrap gap-3">
                  {primary_cta && (
                    <Button label={primary_cta.label} href={primary_cta.url} variant="primary" size="lg" />
                  )}
                  {secondary_cta && (
                    <Button label={secondary_cta.label} href={secondary_cta.url} variant="secondary" size="lg" />
                  )}
                </div>
              )}

              {hasBadgeChips && (
                <div className="flex flex-wrap gap-3">
                  {badges.map((b) => (
                    <Badge key={b.id} label={b.label} theme="dark" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product screenshot */}
          {hasContentImage && (
            <div className="lg:w-1/2">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={image.url}
                  alt={image.alternativeText ?? title}
                  width={image.width ?? 800}
                  height={image.height ?? 600}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
