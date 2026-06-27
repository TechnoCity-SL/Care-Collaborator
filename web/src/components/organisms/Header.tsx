import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import type { GlobalDTO } from '@/types/pages';

interface HeaderProps {
  globalData: GlobalDTO;
}

export function Header({ globalData }: HeaderProps) {
  const { nav_links, nav_cta } = globalData;

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/95 backdrop-blur-[15px]">
      <div className="mx-auto flex h-[74px] max-w-[1920px] items-center justify-between px-[70px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 rounded-md"
          aria-label="Care Collaborator home"
        >
          <span className="font-sans text-[22px] font-bold tracking-tight text-text-nav">
            Care{' '}
            <span className="bg-btn-blue bg-clip-text text-transparent">Collaborator</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {nav_links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target={link.is_external ? '_blank' : undefined}
              rel={link.is_external ? 'noopener noreferrer' : undefined}
              className="font-sans text-[14px] font-normal text-text-nav transition-colors hover:text-blue focus-visible:text-blue focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Button label={nav_cta.label} href={nav_cta.url} variant="primary" size="sm" />
      </div>
    </header>
  );
}
