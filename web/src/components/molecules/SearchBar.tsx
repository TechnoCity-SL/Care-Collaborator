import type { SubmitEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search articles, topics, guides...',
  className = '',
}: SearchBarProps) {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex w-full max-w-[569px] items-center justify-between overflow-hidden rounded-[30px] border-2 border-white bg-white/10 backdrop-blur-sm ${className}`}
    >
      <label htmlFor="insights-search" className="sr-only">
        Search articles, topics, guides
      </label>
      <input
        id="insights-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-4 py-3.5 font-body text-[16px] text-white placeholder:text-white/80 focus-visible:outline-none"
      />

      <button
        type="submit"
        className="flex h-full shrink-0 items-center justify-center bg-search-btn-gradient px-6 font-body text-[16px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
}
