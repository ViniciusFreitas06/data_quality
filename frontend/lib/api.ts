export interface QualityResponse {
  quality_score: number;
  quality_status: "good" | "warning" | "critical" | string;
}

export interface MLTargetResponse {
  column: string;
  problem_type: "classification" | "regression" | string;
  unique_values: number;
}

export interface NumericStat {
  mean: number;
  std: number;
  min: number;
  max: number;
}

export interface CorrelationPair {
  col1: string;
  col2: string;
  correlation: number;
}

export interface MLOutliers {
  total_anomalies: number;
  anomaly_percentage: number;
  anomaly_indexes: number[];
  suspicious_columns: { column: string; difference: number }[];
  anomaly_samples: Record<string, unknown>[];
}

export interface AnalysisResponse {
  rows: number;
  columns: number;
  column_names: string[];
  quality: QualityResponse;
  null_percentage: Record<string, number>;
  duplicate_rows: number;
  constant_columns: string[];
  numeric_stats: Record<string, NumericStat>;
  statistical_outliers: Record<string, number>;
  ml_outliers: MLOutliers;
  possible_targets: MLTargetResponse[];
  correlations: CorrelationPair[];
  warnings: string[];
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export async function analyzeDataset(file: File): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append("file", file);

  let res: Response;
  try {
    res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ApiError(
      `Não foi possível conectar à API em ${API_URL}. Confirme que o backend FastAPI está rodando.`
    );
  }

  if (!res.ok) {
    let detail = `Erro ${res.status} ao processar o arquivo.`;
    try {
      const body = await res.json();
      if (body?.detail) detail = String(body.detail);
    } catch {
      // ignore parse errors
    }
    throw new ApiError(detail);
  }

  return res.json();
}
