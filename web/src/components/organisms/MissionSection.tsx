import Image from 'next/image';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import type { AboutPageDTO } from '@/types/pages';

const QUOTE_HIGHLIGHT = 'the person in the room';

interface MissionSectionProps {
  data: AboutPageDTO;
}

export function MissionSection({ data }: MissionSectionProps) {
  const { mission_label, mission_quote, mission_body, mission_values } = data;

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
    <section className="relative overflow-hidden bg-hero-gradient py-16 md:py-20 lg:py-[120px]" aria-labelledby="mission-heading">

      {/* Bird mascot */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden select-none lg:block" aria-hidden="true">
        <Image src="/images/steps-section/bird.png" alt="" width={180} height={180} className="object-contain" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            {mission_label && (
              <p className="pb-10 font-sans text-[18px] font-bold uppercase tracking-[1.98px] text-[#004BA4]">
                {mission_label}
              </p>
            )}
            <blockquote
              id="mission-heading"
              className="border-l-4 border-teal pl-5 font-heading text-[24px] font-semibold leading-[1.3] text-white sm:text-[28px]"
            >
              {renderQuote()}
            </blockquote>
          </div>

          {mission_body && (
            <p className="whitespace-pre-line font-body text-[16px] leading-[1.8] text-white/80 lg:pt-2">
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
