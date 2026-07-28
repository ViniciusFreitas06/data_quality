import { SectionHeader } from "./SectionHeader";

export function OutliersPanel({
  outliers,
  rows,
}: {
  outliers: Record<string, number>;
  rows: number;
}) {
  const entries = Object.entries(outliers).filter(([, count]) => count > 0);

  return (
    <div>
      <SectionHeader
        eyebrow="Detecção estatística · z-score > 3"
        title="Outliers por coluna"
        hint={`${entries.length} colunas afetadas`}
      />
      {entries.length === 0 ? (
        <p className="text-sm text-muted font-mono">
          Nenhum outlier estatístico detectado.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {entries
            .sort((a, b) => b[1] - a[1])
            .map(([col, count]) => {
              const pct = rows > 0 ? (count / rows) * 100 : 0;
              return (
                <div
                  key={col}
                  className="border border-line bg-surface rounded-lg px-3 py-2.5"
                >
                  <p className="font-mono text-xs text-[#E8ECEF] truncate mb-1">
                    {col}
                  </p>
                  <p className="font-mono text-lg font-bold tabular text-warn">
                    {count}
                    <span className="text-xs text-muted font-normal ml-1">
                      ({pct.toFixed(2)}%)
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
