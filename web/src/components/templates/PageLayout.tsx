import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main id="main-content" role="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
