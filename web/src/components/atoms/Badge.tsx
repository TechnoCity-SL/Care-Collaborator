interface BadgeProps {
  label: string;
  theme?: 'dark' | 'hero' | 'light' | 'green' | 'trust';
  className?: string;
}

const themeClasses: Record<NonNullable<BadgeProps['theme']>, string> = {
  hero: 'bg-[#3a8aff] text-white font-semibold',
  dark: 'bg-white/10 text-white border border-white/20',
  light: 'bg-blue/10 text-blue border border-blue/20',
  green: 'bg-green-600 text-white',
  trust: 'bg-[#5a8ef0] text-white font-semibold',
};

export function Badge({ label, theme = 'light', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-[14px] font-medium ${themeClasses[theme]} ${className}`}
    >
      {theme === 'trust' && (
        <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="none" aria-hidden="true">
          <path d="M2 6.2l2.6 2.6L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {label}
    </span>
  );
}
