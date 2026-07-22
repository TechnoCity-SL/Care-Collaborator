import Image from 'next/image';
import { useRef } from 'react';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { ParallaxCloud } from '@/components/molecules/ParallaxCloud';
import type { MissionSectionDTO } from '@/types/pages';

interface MissionSectionProps {
  data: MissionSectionDTO;
}

export function MissionSection({ data }: MissionSectionProps) {
  const {
    label: mission_label,
    quote: mission_quote,
    quote_highlight: mission_quote_highlight,
    body: mission_body,
    values: mission_values,
    bg_image: mission_bg_image,
    clouds: mission_clouds,
  } = data;
  const hasBgImage = !!mission_bg_image?.url;
  const hasClouds = !!mission_clouds?.length;
  const isLight = !hasBgImage;
  const sectionRef = useRef<HTMLElement>(null);

  const resolvedHighlight =
    mission_quote_highlight && mission_quote.includes(mission_quote_highlight)
      ? mission_quote_highlight
      : null;

  const renderQuote = () => {
    if (!resolvedHighlight) return mission_quote;
    const [before, after] = mission_quote.split(resolvedHighlight);
    return (
      <>
        {before}
        <span className="text-green">{resolvedHighlight}</span>
        {after}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-16 md:py-20 lg:py-[120px] ${isLight ? 'bg-surface-video' : ''}`}
      aria-labelledby="mission-heading"
    >
      {hasBgImage && (
        <>
          <Image
            src={mission_bg_image.url}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-blue-dark/40" aria-hidden="true" />
        </>
      )}

      {hasClouds && mission_clouds.map((cloud) => <ParallaxCloud key={cloud.id} cloud={cloud} containerRef={sectionRef} />)}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            {mission_label && (
              <p
                className={`pb-10 font-sans text-[18px] font-bold uppercase tracking-[1.98px] ${isLight ? 'text-[#004BA4]' : 'text-white'}`}
              >
                {mission_label}
              </p>
            )}
            <blockquote
              id="mission-heading"
              className={`border-l-4 border-teal pl-5 font-heading text-[24px] font-semibold leading-[1.3] sm:text-[28px] ${isLight ? 'text-text-dark' : 'text-white'}`}
            >
              {renderQuote()}
            </blockquote>
          </div>

          {mission_body && (
            <p className={`whitespace-pre-line font-body text-[16px] leading-[1.8] lg:pt-2 ${isLight ? 'text-text-body' : 'text-white/80'}`}>
              {mission_body}
            </p>
          )}
        </div>

        {mission_values.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {mission_values.map((value) => (
              <FeatureCard key={value.id} feature={value} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
