from pydantic import BaseModel
from typing import Dict, List, Any


class QualityResponse(BaseModel):
    quality_score: float
    quality_status: str


class MLTargetResponse(BaseModel):
    column: str
    problem_type: str
    unique_values: int


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

    possible_targets: List[MLTargetResponse]

    correlations: List[Dict[str, Any]]

    warnings: List[str]