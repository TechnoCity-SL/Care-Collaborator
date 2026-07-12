import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge';
import { Heading } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';
import { ParallaxCloud } from '@/components/molecules/ParallaxCloud';
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
    badge_style,
    clouds,
  } = data;

  const hasContentImage = !!image?.url;
  const hasBgImage = !!bg_image?.url;
  const hasBadgeChips = !!badges?.length;
  const hasClouds = !!clouds?.length;
  const isLight = !hasBgImage;
  const trustBadgeTheme = isLight ? 'light' : badge_style === 'figma' ? 'trust' : 'dark';

  return (
    <section
      className={`relative overflow-hidden ${isLight ? 'bg-surface-video' : ''}`}
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

      {hasClouds && clouds.map((cloud) => <ParallaxCloud key={cloud.id} cloud={cloud} />)}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 py-20 lg:px-[70px] lg:py-[100px]">
        <div className={`flex gap-14 ${hasContentImage ? 'flex-col lg:flex-row lg:items-center' : 'flex-col'}`}>

          {/* Text column */}
          <div
            className={`flex flex-col gap-10 lg:gap-[72px] ${
              hasContentImage ? 'lg:w-1/2' : 'mx-auto max-w-[880px] items-center text-center'
            }`}
          >

            {/* Top group: badge → title → subtitle */}
            <div className={`flex flex-col gap-6 lg:gap-[32px] ${hasContentImage ? 'items-start' : 'items-center'}`}>
              {badge && <Badge label={badge} theme={isLight ? 'light' : 'hero'} />}

              <div
                className={`flex flex-col gap-5 max-w-[770px] w-full lg:gap-[24px] ${hasContentImage ? '' : 'items-center'}`}
              >
                <Heading
                  as="h1"
                  id="hero-heading"
                  text={title}
                  highlight={title_highlight}
                  className={`font-heading text-[36px] font-medium leading-[44px] sm:text-[46px] sm:leading-[56px] lg:text-[60px] lg:leading-[72px] ${isLight ? 'text-text-dark' : 'text-white'} ${hasContentImage ? '' : 'text-center'}`}
                  highlightClassName="font-bold text-[#003677]"
                />

                {subtitle && (
                  <p
                    className={`font-body text-[16px] leading-normal ${isLight ? 'text-text-body' : 'text-white'} ${hasContentImage ? '' : 'max-w-[650px] text-center'}`}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom group: CTA buttons + optional trust badges */}
            <div className={`flex flex-col gap-6 ${hasContentImage ? 'items-start' : 'items-center'}`}>
              {(primary_cta || secondary_cta) && (
                <div className={`flex flex-wrap gap-3 ${hasContentImage ? '' : 'justify-center'}`}>
                  {primary_cta && (
                    <Button label={primary_cta.label} href={primary_cta.url} variant="primary" size="lg" />
                  )}
                  {secondary_cta && (
                    <Button
                      label={secondary_cta.label}
                      href={secondary_cta.url}
                      variant={isLight ? 'secondary-light' : 'secondary'}
                      size="lg"
                    />
                  )}
                </div>
              )}

              {hasBadgeChips && (
                <div className={`flex flex-wrap gap-3 ${hasContentImage ? '' : 'justify-center'}`}>
                  {badges.map((b) => (
                    <Badge key={b.id} label={b.label} theme={trustBadgeTheme} />
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
