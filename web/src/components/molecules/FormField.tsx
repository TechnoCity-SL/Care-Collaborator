import type { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: ReactNode;
  helperText?: string;
  footnote?: string;
  valueLabel?: ReactNode;
  valueVariant?: 'plain' | 'boxed';
  badge?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  helperText,
  footnote,
  valueLabel,
  valueVariant = 'plain',
  badge,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-body text-[14px] font-medium text-text-card whitespace-nowrap shrink-0">
          {label}
        </label>
        {helperText && (
          <span className="font-body text-[12px] text-text-body text-right">{helperText}</span>
        )}
        {badge && (
          <span
            className="bg-clip-text font-body text-[14px] font-medium text-transparent shrink-0"
            style={{ backgroundImage: 'linear-gradient(90deg, #0074FF 0%, #74BCFF 100%)' }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">{children}</div>
        {valueLabel && valueVariant === 'boxed' && (
          <span className="rounded-[8px] border border-border px-3 py-2 font-body text-[14px] font-medium text-[#383838] shrink-0">
            {valueLabel}
          </span>
        )}
        {valueLabel && valueVariant === 'plain' && (
          <span
            className="bg-clip-text font-body text-[14px] font-medium text-transparent shrink-0"
            style={{ backgroundImage: 'linear-gradient(90deg, #00C38C 0%, #379EFF 100%)' }}
          >
            {valueLabel}
          </span>
        )}
      </div>
      {footnote && <p className="font-body text-[12px] italic text-text-body">{footnote}</p>}
    </div>
  );
}
