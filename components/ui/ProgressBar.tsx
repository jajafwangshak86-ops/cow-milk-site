interface Props { value: number; max?: number; className?: string; }
export function ProgressBar({ value, max = 100, className = "" }: Props) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`w-full bg-gray-100 rounded-full h-2 ${className}`}>
      <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
