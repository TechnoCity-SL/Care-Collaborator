interface SectionLabelProps {
  label: string;
  theme?: 'dark' | 'light';
  className?: string;
}

export function SectionLabel({ label, theme = 'light', className = '' }: SectionLabelProps) {
  return (
    <p
      className={`font-sans text-[18px] font-bold uppercase tracking-[1.98px] ${theme === 'dark' ? 'text-white' : 'text-blue-label'} ${className}`}
    >
      {label}
    </p>
  );
}
