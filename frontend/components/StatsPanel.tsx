import { SectionHeader } from "./SectionHeader";
import type { NumericStat } from "@/lib/api";

export function StatsPanel({
  stats,
}: {
  stats: Record<string, NumericStat>;
}) {
  const entries = Object.entries(stats);
  if (entries.length === 0) return null;

  return (
    <div>
      <SectionHeader
        eyebrow="Distribuição"
        title="Estatísticas numéricas"
        hint={`${entries.length} colunas numéricas`}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-widest text-muted">
              <th className="py-2 pr-4 font-medium">Coluna</th>
              <th className="py-2 px-4 font-medium text-right">Média</th>
              <th className="py-2 px-4 font-medium text-right">Desvio</th>
              <th className="py-2 px-4 font-medium text-right">Mín</th>
              <th className="py-2 pl-4 font-medium text-right">Máx</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([col, s]) => (
              <tr key={col} className="border-t border-line">
                <td className="py-2 pr-4 font-mono text-xs text-[#E8ECEF]">
                  {col}
                </td>
                <td className="py-2 px-4 font-mono text-xs tabular text-right text-muted">
                  {s.mean.toFixed(2)}
                </td>
                <td className="py-2 px-4 font-mono text-xs tabular text-right text-muted">
                  {s.std.toFixed(2)}
                </td>
                <td className="py-2 px-4 font-mono text-xs tabular text-right text-muted">
                  {s.min.toFixed(2)}
                </td>
                <td className="py-2 pl-4 font-mono text-xs tabular text-right text-muted">
                  {s.max.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
