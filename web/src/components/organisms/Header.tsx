import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import type { GlobalDTO } from '@/types/pages';

interface HeaderProps {
  globalData: GlobalDTO;
}

export function Header({ globalData }: HeaderProps) {
  const { nav_links, nav_cta } = globalData;
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function onResize() {
      if (window.innerWidth >= 1024) setIsOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/20 bg-white/95 backdrop-blur-[15px]"
    >
      <div className="mx-auto flex h-[74px] max-w-[1920px] items-center justify-between px-6 lg:px-[70px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          aria-label="Care Collaborator home"
        >
          <span className="font-sans text-[22px] font-bold tracking-tight text-text-nav">
            Care{' '}
            <span className="bg-btn-blue bg-clip-text text-transparent">Collaborator</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
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

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button label={nav_cta.label} href={nav_cta.url} variant="primary" size="sm" />
        </div>

        {/* Mobile/tablet: hamburger toggle */}
        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-nav transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue lg:hidden"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white px-6 pb-6 pt-3 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {nav_links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target={link.is_external ? '_blank' : undefined}
                rel={link.is_external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 font-sans text-[15px] font-medium text-text-nav transition-colors hover:bg-surface-alt hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <Button
              label={nav_cta.label}
              href={nav_cta.url}
              variant="primary"
              size="md"
              className="w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
