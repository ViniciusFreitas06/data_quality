export function StatBlock({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="border border-line bg-surface rounded-lg px-4 py-3 min-w-0">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1 truncate">
        {label}
      </p>
      <p
        className="font-mono font-bold tabular break-words text-[clamp(0.95rem,4.5vw,1.5rem)] leading-tight"
        style={{ color: accent ?? "#E8ECEF" }}
      >
        {value}
      </p>
    </div>
  );
}
