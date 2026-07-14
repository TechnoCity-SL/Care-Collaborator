interface SectionLabelProps {
  label: string;
  theme?: 'dark' | 'light';
  size?: 'lg' | 'sm';
  className?: string;
}

const sizeClasses: Record<NonNullable<SectionLabelProps['size']>, string> = {
  lg: 'text-[18px] font-bold tracking-[1.98px]',
  sm: 'text-[12px] font-semibold tracking-[1.32px]',
};

export function SectionLabel({ label, theme = 'light', size = 'lg', className = '' }: SectionLabelProps) {
  return (
    <p
      className={`font-sans uppercase ${sizeClasses[size]} ${theme === 'dark' ? 'text-white' : 'text-blue-label'} ${className}`}
    >
      {label}
    </p>
  );
}
