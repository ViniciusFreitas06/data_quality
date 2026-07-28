import { SectionHeader } from "./SectionHeader";

function barColor(pct: number) {
  if (pct > 30) return "#F2545B";
  if (pct > 10) return "#F5B942";
  return "#3DDC97";
}

export function NullsPanel({
  nullPercentage,
  constantColumns,
}: {
  nullPercentage: Record<string, number>;
  constantColumns: string[];
}) {
  const entries = Object.entries(nullPercentage).sort((a, b) => b[1] - a[1]);
  const constantSet = new Set(constantColumns);

  return (
    <div>
      <SectionHeader
        eyebrow="Completude"
        title="Valores nulos por coluna"
        hint={`${entries.filter(([, v]) => v > 0).length} de ${entries.length} colunas`}
      />
      <div className="space-y-2">
        {entries.map(([col, pct]) => (
          <div key={col} className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#E8ECEF] w-40 truncate shrink-0">
              {col}
              {constantSet.has(col) && (
                <span className="ml-1.5 text-[9px] text-muted border border-line rounded px-1 py-0.5 align-middle">
                  constante
                </span>
              )}
            </span>
            <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.max(pct, pct > 0 ? 2 : 0)}%`,
                  background: barColor(pct),
                }}
              />
            </div>
            <span className="font-mono text-xs tabular text-muted w-14 text-right shrink-0">
              {pct.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
