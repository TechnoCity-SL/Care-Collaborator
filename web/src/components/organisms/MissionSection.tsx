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
      {/* Decorative clouds — always visible, matches CtaBanner's decorative-chrome precedent */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <div className="absolute -left-16 -top-14 h-56 w-72 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute -left-6 top-4 h-32 w-44 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -right-14 bottom-0 h-52 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-28 w-40 rounded-full bg-white/15 blur-2xl" />
        <svg className="absolute left-[38%] top-10 h-4 w-4 text-white/50" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
        </svg>
        <svg className="absolute right-[10%] top-20 h-3 w-3 text-white/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
        </svg>
      </div>

      {/* Bird mascot */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden select-none lg:block" aria-hidden="true">
        <Image src="/images/steps-section/bird.png" alt="" width={180} height={180} className="object-contain" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            {mission_label && (
              <p className="mb-3 font-sans text-[18px] font-bold uppercase tracking-[1.98px] text-white">
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
