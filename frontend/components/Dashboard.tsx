"use client";

import { motion } from "framer-motion";
import type { AnalysisResponse } from "@/lib/api";
import { QualityGauge } from "./QualityGauge";
import { StatBlock } from "./StatBlock";
import { NullsPanel } from "./NullsPanel";
import { StatsPanel } from "./StatsPanel";
import { OutliersPanel } from "./OutliersPanel";
import { CorrelationPanel } from "./CorrelationPanel";
import { MLAnomaliesPanel } from "./MLAnomaliesPanel";
import { TargetsPanel } from "./TargetsPanel";
import { WarningsPanel } from "./WarningsPanel";

const section = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function Section({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      variants={section}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="border border-line bg-ink-soft rounded-xl p-6"
    >
      {children}
    </motion.div>
  );
}

export function Dashboard({ data }: { data: AnalysisResponse }) {
  return (
    <div className="space-y-5">
      <Section index={0}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <QualityGauge
            score={data.quality.quality_score}
            status={data.quality.quality_status}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto md:max-w-md">
            <StatBlock label="Linhas" value={data.rows.toLocaleString("pt-BR")} />
            <StatBlock label="Colunas" value={data.columns} />
            <StatBlock
              label="Duplicatas"
              value={data.duplicate_rows}
              accent={data.duplicate_rows > 0 ? "#F5B942" : undefined}
            />
            <StatBlock
              label="Constantes"
              value={data.constant_columns.length}
              accent={data.constant_columns.length > 0 ? "#F5B942" : undefined}
            />
          </div>
        </div>
      </Section>

      <Section index={1}>
        <WarningsPanel warnings={data.warnings} />
      </Section>

      <Section index={2}>
        <NullsPanel
          nullPercentage={data.null_percentage}
          constantColumns={data.constant_columns}
        />
      </Section>

      <Section index={3}>
        <StatsPanel stats={data.numeric_stats} />
      </Section>

      <Section index={4}>
        <OutliersPanel outliers={data.statistical_outliers} rows={data.rows} />
      </Section>

      <Section index={5}>
        <CorrelationPanel correlations={data.correlations} />
      </Section>

      <Section index={6}>
        <MLAnomaliesPanel ml={data.ml_outliers} />
      </Section>

      <Section index={7}>
        <TargetsPanel targets={data.possible_targets} />
      </Section>
    </div>
  );
}
