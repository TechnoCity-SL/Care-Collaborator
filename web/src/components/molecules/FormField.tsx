import type { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  helperText?: string;
  footnote?: string;
  valueLabel?: ReactNode;
  children: ReactNode;
}

export function FormField({ id, label, helperText, footnote, valueLabel, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-body text-[14px] font-medium text-text-card">
          {label}
        </label>
        {helperText && (
          <span className="font-body text-[12px] text-text-body">{helperText}</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">{children}</div>
        {valueLabel && (
          <span className="font-heading text-[16px] font-semibold text-blue-dark shrink-0">
            {valueLabel}
          </span>
        )}
      </div>
      {footnote && <p className="font-body text-[12px] italic text-text-body">{footnote}</p>}
    </div>
  );
}
