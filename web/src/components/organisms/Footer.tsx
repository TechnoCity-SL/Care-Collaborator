import Link from 'next/link';
import type { GlobalDTO } from '@/types/pages';

interface FooterProps {
  globalData: GlobalDTO;
}

export function Footer({ globalData }: FooterProps) {
  const {
    footer_tagline,
    footer_columns,
    footer_email,
    footer_phone,
    footer_address,
  } = globalData;

  return (
    <footer className="bg-footer-bg pt-24 pb-8">
      <div className="mx-auto max-w-[1780px] px-[70px]">
        <div className="flex items-start justify-between gap-12">
          {/* Brand column */}
          <div className="flex max-w-[520px] flex-col gap-6">
            <span className="font-sans text-[22px] font-bold tracking-tight text-white">
              Care{' '}
              <span className="bg-btn-blue bg-clip-text text-transparent">Collaborator</span>
            </span>
            {footer_tagline && (
              <p className="font-body text-[18px] leading-normal text-footer-text">
                {footer_tagline}
              </p>
            )}
            <div className="flex flex-col gap-1 font-body text-[16px] text-footer-muted">
              {footer_email && (
                <a href={`mailto:${footer_email}`} className="transition-colors hover:text-footer-text">
                  {footer_email}
                </a>
              )}
              {footer_phone && (
                <span>
                  <a href={`tel:${footer_phone.replace(/\s/g, '')}`} className="transition-colors hover:text-footer-text">
                    {footer_phone}
                  </a>
                  {footer_address && ` · ${footer_address}`}
                </span>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-1 items-start justify-between gap-8">
            {footer_columns.map((col) => (
              <div key={col.id} className="flex flex-col gap-6">
                <p className="font-body text-[18px] font-normal uppercase tracking-wide text-footer-header">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.url}
                        target={link.is_external ? '_blank' : undefined}
                        rel={link.is_external ? 'noopener noreferrer' : undefined}
                        className="font-body text-[16px] text-footer-text transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex items-center justify-between font-body text-[16px] text-footer-muted">
            <p>© Care Collaborator {new Date().getFullYear()}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>🇦🇺 Australian-owned · Data compliant</span>
              <Link href="/privacy" className="transition-colors hover:text-footer-text">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
