import { SectionHeader } from "./SectionHeader";
import type { MLTargetResponse } from "@/lib/api";

export function TargetsPanel({ targets }: { targets: MLTargetResponse[] }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Sugestão automática"
        title="Possíveis variáveis-alvo"
        hint={`${targets.length} candidatas`}
      />
      {targets.length === 0 ? (
        <p className="text-sm text-muted font-mono">
          Nenhuma coluna candidata identificada.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {targets.map((t) => (
            <div
              key={t.column}
              className="flex items-center justify-between border border-line bg-surface rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-mono text-sm text-[#E8ECEF]">{t.column}</p>
                <p className="text-xs text-muted mt-0.5">
                  {t.unique_values} valores únicos
                </p>
              </div>
              <span
                className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  t.problem_type === "classification"
                    ? "border-signal text-signal"
                    : "border-good text-good"
                }`}
              >
                {t.problem_type === "classification"
                  ? "classificação"
                  : "regressão"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
