interface SliderProps {
  id: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function Slider({ id, value, min, max, step = 1, onChange, className = '' }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      style={{
        backgroundImage: `linear-gradient(to right, #0074FF ${percent}%, var(--color-border) ${percent}%)`,
      }}
      className={`h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border
        [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.8px] [&::-webkit-slider-thumb]:border-white
        [&::-webkit-slider-thumb]:bg-btn-blue [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.08)]
        [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[2.8px] [&::-moz-range-thumb]:border-white
        [&::-moz-range-thumb]:bg-btn-blue
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2
        ${className}`}
    />
  );
}
