interface PartnerLogosSectionProps {
  heading?: string;
}

export function PartnerLogosSection({ heading = 'Trusted by Australian care providers' }: PartnerLogosSectionProps) {
  return (
    <section className="border-b border-border bg-white py-10" aria-label="Partner organisations">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
          {heading}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {['Provider A', 'Provider B', 'Provider C', 'Provider D', 'Provider E'].map((name) => (
            <div
              key={name}
              className="flex h-8 w-28 items-center justify-center rounded bg-surface-alt"
              aria-label={name}
            >
              <span className="text-xs font-semibold text-muted/50">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
