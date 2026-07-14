interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps {
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (id: string) => void;
  className?: string;
}

export function Select({ id, value, options, onChange, className = '' }: SelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-[12px] border border-border bg-white px-4 py-3 pr-10 font-body text-[14px] font-medium text-text-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-text-body"
        fill="none"
        aria-hidden="true"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
