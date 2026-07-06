import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';
import { ChecklistRow } from '@/components/molecules/ChecklistRow';
import type { AboutPageDTO } from '@/types/pages';

interface OriginSectionProps {
  data: AboutPageDTO;
}

export function OriginSection({ data }: OriginSectionProps) {
  const {
    origin_label,
    origin_heading,
    origin_body,
    problem_heading,
    problem_badge,
    problem_subtitle,
    problem_items,
  } = data;

  return (
    <section className="bg-white py-16 md:py-20 lg:py-[120px]" aria-labelledby="origin-heading">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_385px] lg:gap-18">
          <div>
            {origin_label && <SectionLabel label={origin_label} className="mb-8" />}
            <Heading
              as="h2"
              id="origin-heading"
              text={origin_heading}
              className="font-heading text-[clamp(28px,4vw,40px)] font-semibold leading-[1.15] text-text-dark"
            />
            <div className="mt-10 flex flex-col gap-4">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="font-body text-[15px] leading-[1.7] text-text-body">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-text-card">{children}</strong>
                  ),
                }}
              >
                {origin_body}
              </ReactMarkdown>
            </div>
          </div>

          {problem_items.length > 0 && (
            <div className="relative max-w-[385px]">
              {problem_badge && (
                <span
                  className="absolute -top-3 right-6 z-10 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-blue-dark"
                  style={{ backgroundImage: 'linear-gradient(179deg, rgb(8, 223, 162) 1%, rgb(116, 188, 255) 99%)' }}
                >
                  {problem_badge}
                </span>
              )}

              <div className="rounded-[24px] bg-[#eef2fc] py-8 px-6 pt-10 shadow-sm">
                <div className="pb-8 flex items-start justify-between gap-3">
                  <div>
                    {problem_heading && (
                      <p className="font-body text-[18px] font-semibold leading-snug text-text-card">
                        {problem_heading}
                      </p>
                    )}
                    {problem_subtitle && (
                      <p className="font-body text-[13px] leading-snug text-text-body">
                        {problem_subtitle}
                      </p>
                    )}
                  </div>
                  <Image src="/images/video-section/bird.png" alt="" width={56} height={50} className="shrink-0" />
                </div>

                <div className="border-t border-border" />

                <ul className="flex flex-col gap-6 pt-8">
                  {problem_items.map((item) => (
                    <ChecklistRow key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
