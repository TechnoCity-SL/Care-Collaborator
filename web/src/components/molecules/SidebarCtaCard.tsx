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
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-blue" aria-hidden="true">
          <path
            d="M12 3c-3.5 0-6 2.5-6 6 0 2.5 1.5 4 1.5 6l.5 3h8l.5-3c0-2 1.5-3.5 1.5-6 0-3.5-2.5-6-6-6z"
            fill="currentColor"
          />
          <circle cx="9.5" cy="8.5" r="1" fill="white" />
        </svg>
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
