import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import type { CtaButtonDTO } from '@/types/pages';

interface SidebarCtaCardProps {
  heading: string;
  body?: string;
  primaryCta?: CtaButtonDTO;
  secondaryCta?: CtaButtonDTO;
}

export function SidebarCtaCard({ heading, body, primaryCta, secondaryCta }: SidebarCtaCardProps) {
  return (
    <div className="rounded-[20px] border border-border/70 bg-surface-video p-6 text-center">
      <div className="mx-auto mb-4 flex items-center justify-center">
        <Image src="/images/insights/cta-bird.svg" alt="" width={120} height={108} />
      </div>
      <p className="mb-2 font-sans text-lg font-bold uppercase tracking-[0.08em] text-blue-dark">
        {heading}
      </p>
      {body && <p className="mb-6 font-body text-sm leading-relaxed text-blue-label">{body}</p>}
      <div className="flex flex-col items-center gap-3">
        {primaryCta && (
          <Button
            label={primaryCta.label}
            href={primaryCta.url}
            variant="primary"
            size="md"
            className="w-full justify-center"
          />
        )}
        {secondaryCta && (
          <a
            href={secondaryCta.url}
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-blue transition-opacity hover:opacity-80"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" opacity="0.15" />
              <path d="M10 8.5v7l6-3.5-6-3.5z" />
            </svg>
            {secondaryCta.label}
          </a>
        )}
      </div>
    </div>
  );
}
