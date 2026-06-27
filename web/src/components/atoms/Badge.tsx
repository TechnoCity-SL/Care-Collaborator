interface BadgeProps {
  label: string;
  theme?: 'dark' | 'hero' | 'light' | 'green';
  className?: string;
}

const themeClasses: Record<NonNullable<BadgeProps['theme']>, string> = {
  hero: 'bg-[#3a8aff] text-white font-semibold',
  dark: 'bg-white/10 text-white border border-white/20',
  light: 'bg-blue/10 text-blue border border-blue/20',
  green: 'bg-green-600 text-white',
};

export function Badge({ label, theme = 'light', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1 text-[14px] font-medium ${themeClasses[theme]} ${className}`}
    >
      {label}
    </span>
  );
}
