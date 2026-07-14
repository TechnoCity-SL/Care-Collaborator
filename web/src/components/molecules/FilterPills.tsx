interface FilterOption {
  value: string;
  label: string;
}

interface FilterPillsProps {
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function FilterPills({ options, selected, onSelect, className = '' }: FilterPillsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <span className="font-body text-sm font-medium text-text-dark">FILTER:</span>
      <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filter articles by category">
        {options.map((option) => {
          const isActive = option.value === selected;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(option.value)}
              className={`rounded-[14px] px-3 py-2 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-btn-blue text-white'
                  : 'border border-border text-text-body hover:border-blue hover:text-blue'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
