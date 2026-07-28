"use client";

import { motion } from "framer-motion";

const STATUS_COPY: Record<string, { label: string; color: string }> = {
  good: { label: "Dataset saudável", color: "#3DDC97" },
  warning: { label: "Requer atenção", color: "#F5B942" },
  critical: { label: "Problemas críticos", color: "#F2545B" },
};

export function QualityGauge({
  score,
  status,
}: {
  score: number;
  status: string;
}) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score)) / 100;
  const offset = circumference * (1 - progress);
  const meta = STATUS_COPY[status] ?? {
    label: status,
    color: "#5B8DEF",
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-40 h-40 shrink-0">
        <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#232B33"
            strokeWidth="10"
          />
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={meta.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-bold tabular text-[#E8ECEF]">
            {score.toFixed(0)}
          </span>
          <span className="font-mono text-[10px] text-muted tracking-widest">
            / 100
          </span>
        </div>
      </div>
      <div>
        <span
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{ borderColor: meta.color, color: meta.color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-blink"
            style={{ background: meta.color }}
          />
          {status}
        </span>
        <p className="font-display text-lg mt-3 text-[#E8ECEF]">
          {meta.label}
        </p>
        <p className="text-sm text-muted mt-1 max-w-xs">
          Score calculado a partir de nulos, duplicatas, colunas constantes,
          correlações extremas e outliers estatísticos.
        </p>
      </div>
    </div>
  );
}
