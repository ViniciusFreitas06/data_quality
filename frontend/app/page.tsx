"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadZone } from "@/components/UploadZone";
import { Dashboard } from "@/components/Dashboard";
import { analyzeDataset, ApiError, type AnalysisResponse } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [fileName, setFileName] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    setIsProcessing(true);
    setError(null);
    setData(null);
    try {
      const result = await analyzeDataset(file);
      setData(result);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Erro inesperado ao analisar o arquivo."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 font-mono text-xs text-signal tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-blink" />
            data quality lab
          </div>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.1] text-[#E8ECEF] max-w-2xl">
            Todo dataset esconde um problema. Este raio-x encontra em segundos.
          </h1>
          <p className="text-muted mt-5 max-w-xl leading-relaxed">
            Envie um CSV e receba um diagnóstico completo: nulos, duplicatas,
            colunas constantes, correlações fortes, outliers estatísticos e
            anomalias sinalizadas por um modelo de Isolation Forest — a mesma
            checagem que normalmente toma uma tarde de trabalho manual.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <UploadZone
            onFile={handleFile}
            isProcessing={isProcessing}
            fileName={fileName}
            error={error}
          />
        </motion.div>

        {data && (
          <div className="mt-10">
            <Dashboard data={data} />
          </div>
        )}

        <footer className="mt-20 pt-6 border-t border-line font-mono text-xs text-muted flex flex-col md:flex-row gap-2 md:justify-between">
          <span>Data Quality Platform — FastAPI + pandas + scikit-learn</span>
        </footer>
      </div>
    </main>
  );
}
