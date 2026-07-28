interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  hint?: string;
}

export function SectionHeader({ eyebrow, title, hint }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 mb-5">
      <div>
        <span className="block font-mono text-[11px] tracking-[0.2em] text-signal uppercase mb-1">
          {eyebrow}
        </span>
        <h2 className="font-display text-xl text-[#E8ECEF]">{title}</h2>
      </div>
      {hint && (
        <span className="font-mono text-xs text-muted whitespace-nowrap">
          {hint}
        </span>
      )}
    </div>
  );
}
