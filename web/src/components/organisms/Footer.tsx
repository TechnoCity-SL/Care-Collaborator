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
    <footer className="bg-footer-bg pb-8 pt-16 lg:pt-[72px]">
      <div className="mx-auto max-w-[1780px] px-6 lg:px-[70px]">

        {/* Main grid: brand col on top on mobile, side-by-side on lg */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

          {/* Brand column */}
          <div className="flex max-w-full flex-col gap-6 lg:max-w-[520px]">
            <span className="font-sans text-[22px] font-bold tracking-tight text-white">
              Care{' '}
              <span className="bg-btn-blue bg-clip-text text-transparent">Collaborator</span>
            </span>
            {footer_tagline && (
              <p className="font-body text-[16px] leading-normal text-footer-text lg:text-[18px]">
                {footer_tagline}
              </p>
            )}
            <div className="flex flex-col gap-1 font-body text-[14px] text-footer-muted lg:text-[16px]">
              {footer_email && (
                <a
                  href={`mailto:${footer_email}`}
                  className="transition-colors hover:text-footer-text"
                >
                  {footer_email}
                </a>
              )}
              {footer_phone && (
                <span>
                  <a
                    href={`tel:${footer_phone.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-footer-text"
                  >
                    {footer_phone}
                  </a>
                  {footer_address && ` · ${footer_address}`}
                </span>
              )}
            </div>
          </div>

          {/* Link columns — 2-col grid on mobile/tablet, flex row on lg */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12 lg:flex lg:flex-1 lg:justify-between">
            {footer_columns.map((col) => (
              <div key={col.id} className="flex flex-col gap-5">
                <p className="font-body text-[14px] font-semibold uppercase tracking-wide text-footer-header lg:text-[18px] lg:font-normal">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3 lg:gap-4">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.url}
                        target={link.is_external ? '_blank' : undefined}
                        rel={link.is_external ? 'noopener noreferrer' : undefined}
                        className="font-body text-[14px] text-footer-text transition-colors hover:text-white lg:text-[16px]"
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
        <div className="mt-10 border-t border-white/10 pt-8 lg:mt-12">
          <div className="flex flex-col gap-4 font-body text-[13px] text-footer-muted sm:flex-row sm:items-center sm:justify-between lg:text-[16px]">
            <p>© Care Collaborator {new Date().getFullYear()}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
