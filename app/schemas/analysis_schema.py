from pydantic import BaseModel
from typing import Dict, List, Any

class QualityResponse(BaseModel):
    quality_score: float
    quality_status: str

class AnalysisResponse(BaseModel):
    rows: int
    columns: int
    column_names: List[str]
    quality: QualityResponse
    null_percentage: Dict[str, float]
    duplicate_rows: int
    constant_columns: List[str]
    numeric_stats: Dict[str, Any]
    statistical_outliers: Dict[str, int]
    ml_outliers: Dict[str, Any]
    correlations: List[Dict[str, Any]]
    warnings: List[str]