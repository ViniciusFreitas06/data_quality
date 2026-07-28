import { SectionHeader } from "./SectionHeader";
import { StatBlock } from "./StatBlock";
import type { MLOutliers } from "@/lib/api";

export function MLAnomaliesPanel({ ml }: { ml: MLOutliers }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Isolation Forest · contaminação 2%"
        title="Anomalias detectadas por ML"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatBlock
          label="Anomalias"
          value={ml.total_anomalies}
          accent="#F2545B"
        />
        <StatBlock
          label="% do dataset"
          value={`${ml.anomaly_percentage.toFixed(2)}%`}
        />
        <StatBlock
          label="Índices sinalizados"
          value={ml.anomaly_indexes.length}
        />
        <StatBlock
          label="Amostras coletadas"
          value={ml.anomaly_samples.length}
        />
      </div>

      {ml.suspicious_columns.length > 0 && (
        <div className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
            Colunas que mais diferenciam pontos anômalos
          </p>
          <div className="flex flex-wrap gap-2">
            {ml.suspicious_columns.map((s) => (
              <span
                key={s.column}
                className="font-mono text-xs border border-line bg-surface rounded-full px-3 py-1 text-[#E8ECEF]"
              >
                {s.column}{" "}
                <span className="text-critical">Δ {s.difference}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {ml.anomaly_indexes.length > 0 && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
            Índices de linhas anômalas (primeiras {Math.min(20, ml.anomaly_indexes.length)})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ml.anomaly_indexes.map((idx) => (
              <span
                key={idx}
                className="font-mono text-[11px] tabular border border-critical/40 text-critical rounded px-2 py-0.5"
              >
                #{idx}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
