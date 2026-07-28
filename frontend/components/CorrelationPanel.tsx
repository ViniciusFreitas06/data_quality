import { SectionHeader } from "./SectionHeader";
import type { CorrelationPair } from "@/lib/api";

export function CorrelationPanel({
  correlations,
}: {
  correlations: CorrelationPair[];
}) {
  return (
    <div>
      <SectionHeader
        eyebrow="Pares com |r| > 0.6"
        title="Correlações relevantes"
        hint={`${correlations.length} pares`}
      />
      {correlations.length === 0 ? (
        <p className="text-sm text-muted font-mono">
          Nenhuma correlação forte encontrada entre colunas numéricas.
        </p>
      ) : (
        <div className="space-y-2">
          {[...correlations]
            .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
            .map((c, i) => {
              const strength = Math.abs(c.correlation);
              const color =
                strength > 0.8 ? "#F2545B" : strength > 0.7 ? "#F5B942" : "#5B8DEF";
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#E8ECEF] w-56 truncate shrink-0">
                    {c.col1} <span className="text-muted">×</span> {c.col2}
                  </span>
                  <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full absolute top-0"
                      style={{
                        left: c.correlation < 0 ? `${50 - strength * 50}%` : "50%",
                        width: `${strength * 50}%`,
                        background: color,
                      }}
                    />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line" />
                  </div>
                  <span
                    className="font-mono text-xs tabular w-14 text-right shrink-0"
                    style={{ color }}
                  >
                    {c.correlation.toFixed(2)}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
