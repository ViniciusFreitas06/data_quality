import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function WarningsPanel({ warnings }: { warnings: string[] }) {
  return (
    <div>
      <SectionHeader eyebrow="Diagnóstico" title="Avisos" />
      {warnings.length === 0 ? (
        <div className="flex items-center gap-2 text-good font-mono text-sm">
          <CheckCircle2 size={16} />
          Nenhum problema relevante encontrado neste dataset.
        </div>
      ) : (
        <ul className="space-y-2">
          {warnings.map((w, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 border border-line bg-surface rounded-lg px-3 py-2.5"
            >
              <AlertTriangle size={15} className="text-warn shrink-0 mt-0.5" />
              <span className="text-sm text-[#E8ECEF]">{w}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
