import Image from 'next/image';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import type { MissionSectionDTO } from '@/types/pages';

const QUOTE_HIGHLIGHT = 'the person in the room';

interface MissionSectionProps {
  data: MissionSectionDTO;
}

export function MissionSection({ data }: MissionSectionProps) {
  const { label: mission_label, quote: mission_quote, body: mission_body, values: mission_values, bg_image: mission_bg_image } = data;
  const hasBgImage = !!mission_bg_image?.url;
  const isLight = !hasBgImage;

  const renderQuote = () => {
    if (!mission_quote.includes(QUOTE_HIGHLIGHT)) return mission_quote;
    const [before, after] = mission_quote.split(QUOTE_HIGHLIGHT);
    return (
      <>
        {before}
        <span className="text-green">{QUOTE_HIGHLIGHT}</span>
        {after}
      </>
    );
  };

  return (
    <section
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

          {/* Bird mascot */}
          <div className="pointer-events-none absolute bottom-0 left-0 hidden select-none lg:block" aria-hidden="true">
            <Image src="/images/steps-section/bird.png" alt="" width={180} height={180} className="object-contain" />
          </div>
        </>
      )}

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
