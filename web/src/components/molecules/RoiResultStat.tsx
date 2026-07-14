interface RoiResultStatProps {
  label: string;
  value: string;
  accentColor?: string;
}

export function RoiResultStat({ label, value, accentColor }: RoiResultStatProps) {
  return (
    <div className="rounded-[16px] bg-white/20 p-4">
      <p className="font-body text-[14px] text-white">{label}</p>
      <p
        className="mt-1 font-heading text-[24px] font-bold text-white"
        style={accentColor ? { color: accentColor } : undefined}
      >
        {value}
      </p>
    </div>
  );
}
