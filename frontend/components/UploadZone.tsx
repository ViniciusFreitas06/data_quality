"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileSpreadsheet } from "lucide-react";

interface UploadZoneProps {
  onFile: (file: File) => void;
  isProcessing: boolean;
  fileName?: string;
  error?: string | null;
}

export function UploadZone({
  onFile,
  isProcessing,
  fileName,
  error,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed cursor-pointer transition-colors px-8 py-14 text-center ${
          isDragging
            ? "border-signal bg-signal/5"
            : "border-line bg-surface hover:border-signal/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="absolute inset-x-0 -top-14 h-28 bg-gradient-to-b from-signal/25 to-transparent animate-scan" />
              <FileSpreadsheet
                size={36}
                className="mx-auto mb-4 text-signal"
              />
              <p className="font-mono text-sm text-[#E8ECEF]">
                Escaneando {fileName}
                <span className="animate-blink">…</span>
              </p>
              <p className="font-mono text-xs text-muted mt-2">
                calculando nulos · duplicatas · correlações · outliers · anomalias ML
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UploadCloud
                size={36}
                className={`mx-auto mb-4 ${
                  isDragging ? "text-signal" : "text-muted"
                }`}
              />
              <p className="font-display text-lg text-[#E8ECEF]">
                Arraste um arquivo .csv ou clique para selecionar
              </p>
              <p className="font-mono text-xs text-muted mt-2">
                processado localmente pela API · nada é armazenado
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="font-mono text-xs text-critical mt-3">{error}</p>
      )}
    </div>
  );
}
